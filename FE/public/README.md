# public/

Files here are served from the site root as-is, without hashing or processing.

## me.jpg — your portrait

`src/components/Avatar.tsx` loads `/me.jpg`, which means **this folder**, not
`src/assets`. Save the photo as `public/me.jpg`.

Before you do:

1. **Rotate it upright.** The photo you sent is a portrait shot saved sideways
   (the EXIF orientation flag was lost somewhere). Browsers will show it lying
   on its side.
2. **Crop it square** and roughly centre your face — the avatar is a circle,
   and `object-cover` crops whatever does not fit.
3. **Resize to about 400x400** and export as JPEG. It renders at 160 CSS px, so
   400px covers a 2x retina screen with room to spare. A 3088x2316 original is
   ~2 MB of download for a 160px circle.

Until the file exists the avatar falls back to your initials, so nothing
breaks — the page just looks unfinished.
