import { useState } from "react";

type AvatarProps = {
  src: string;
  name: string;
  className?: string;
};

/**
 * Round portrait with an initials fallback.
 *
 * The fallback is not politeness, it is the reason the build does not depend
 * on a binary file: if `/me.jpg` is missing or fails to load, the layout keeps
 * its exact size and shows initials instead of a broken-image glyph.
 */
export function Avatar({ src, name, className = "size-32 sm:size-40" }: AvatarProps) {
  const [hasFailed, setHasFailed] = useState(false);

  const shell = `${className} shrink-0 rounded-full ring-1 ring-line`;

  if (hasFailed) {
    return (
      <div
        role="img"
        aria-label={name}
        className={`${shell} flex items-center justify-center bg-accent-soft text-2xl font-medium tracking-wide text-accent`}
      >
        {initialsOf(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      width={160}
      height={160}
      // `object-cover` crops to fill instead of squashing: a portrait photo in
      // a circle must not be stretched to a square first.
      className={`${shell} object-cover`}
      onError={() => setHasFailed(true)}
    />
  );
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}
