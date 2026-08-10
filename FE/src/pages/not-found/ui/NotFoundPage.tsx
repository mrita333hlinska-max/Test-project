import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Page not found</h1>
      <p className="mt-4 max-w-prose text-ink-muted">
        That URL does not exist. It may have been renamed.
      </p>
      <Link
        to="/"
        className="mt-10 inline-block rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Back to the start
      </Link>
    </section>
  );
}
