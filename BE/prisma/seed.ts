import "dotenv/config";
import { readFile } from "node:fs/promises";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

// Shapes of the JSON files in ./seed-data. These are hand-written assertions,
// not validation: nothing checks at runtime that the files really look like this.
// Stage 7 replaces `as T[]` below with a zod schema — "parse, don't validate".
type CategorySeed = { id: number; name: string };
type ShopSeed = { id: number; name: string; address: string; country: string };
type CartItemSeed = { userId: number; productId: number; quantity: number };

type UserSeed = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: string;
  country: string;
};

type ProductSeed = {
  id: number;
  name: string;
  description: string;
  price: number;
  country: string;
  manufacturer: string;
  category: { id: number };
  shop: { id: number }[];
};

const seedDataDir = new URL("./seed-data/", import.meta.url);

async function readSeedFile<T>(fileName: string): Promise<T[]> {
  const raw = await readFile(new URL(fileName, seedDataDir), "utf8");
  return JSON.parse(raw) as T[];
}

async function seedCategories(prisma: PrismaClient): Promise<number> {
  const categories = await readSeedFile<CategorySeed>("categories.json");

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: { name: category.name },
      create: { id: category.id, name: category.name },
    });
  }

  return categories.length;
}

async function seedShops(prisma: PrismaClient): Promise<number> {
  const shops = await readSeedFile<ShopSeed>("shops.json");

  for (const shop of shops) {
    const fields = { name: shop.name, address: shop.address, country: shop.country };
    await prisma.shop.upsert({
      where: { id: shop.id },
      update: fields,
      create: { id: shop.id, ...fields },
    });
  }

  return shops.length;
}

/**
 * Users get a generated uuid, so the numeric ids in users.json are only a
 * local key. The returned map translates them for cart_items.json.
 */
async function seedUsers(prisma: PrismaClient): Promise<Map<number, string>> {
  const users = await readSeedFile<UserSeed>("users.json");
  const userIdBySeedId = new Map<number, string>();

  for (const user of users) {
    const fields = {
      name: user.name,
      username: user.username,
      address: user.address,
      country: user.country,
    };
    const saved = await prisma.user.upsert({
      where: { email: user.email },
      update: fields,
      create: { email: user.email, ...fields },
    });
    userIdBySeedId.set(user.id, saved.id);
  }

  return userIdBySeedId;
}

async function seedProducts(prisma: PrismaClient): Promise<number> {
  const products = await readSeedFile<ProductSeed>("products.json");

  for (const product of products) {
    const shops = product.shop.map((shop) => ({ id: shop.id }));
    const fields = {
      name: product.name,
      description: product.description,
      // Decimal takes a string: a JS number cannot represent 713.9 exactly.
      price: product.price.toFixed(2),
      country: product.country,
      manufacturer: product.manufacturer,
      categoryId: product.category.id,
    };

    await prisma.product.upsert({
      where: { id: product.id },
      update: { ...fields, shops: { set: shops } },
      create: { id: product.id, ...fields, shops: { connect: shops } },
    });
  }

  return products.length;
}

async function seedCartItems(
  prisma: PrismaClient,
  userIdBySeedId: Map<number, string>,
): Promise<number> {
  const cartItems = await readSeedFile<CartItemSeed>("cart_items.json");

  for (const item of cartItems) {
    const userId = userIdBySeedId.get(item.userId);
    if (!userId) {
      throw new Error(`cart_items.json references unknown user id ${item.userId}`);
    }

    await prisma.cartItem.upsert({
      where: { userId_productId: { userId, productId: item.productId } },
      update: { quantity: item.quantity },
      create: { userId, productId: item.productId, quantity: item.quantity },
    });
  }

  return cartItems.length;
}

/**
 * The rows above were inserted with ids taken from the JSON files, which leaves
 * each autoincrement sequence still pointing at 1. Without this, the first row
 * the API creates would collide with an existing id.
 */
async function resyncSequences(prisma: PrismaClient): Promise<void> {
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Category"', 'id'), COALESCE((SELECT MAX(id) FROM "Category"), 1))`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Shop"', 'id'), COALESCE((SELECT MAX(id) FROM "Shop"), 1))`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Product"', 'id'), COALESCE((SELECT MAX(id) FROM "Product"), 1))`;
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set — copy BE/.env.example to BE/.env");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

try {
  console.log("categories:", await seedCategories(prisma));
  console.log("shops:     ", await seedShops(prisma));

  const userIdBySeedId = await seedUsers(prisma);
  console.log("users:     ", userIdBySeedId.size);

  console.log("products:  ", await seedProducts(prisma));
  console.log("cart items:", await seedCartItems(prisma, userIdBySeedId));

  await resyncSequences(prisma);
  console.log("done");
} finally {
  await prisma.$disconnect();
}
