import { Link } from "react-router";
import { Avatar } from "@/shared/ui";

const NAME = "Marharyta Hlinskaya";
const ROLE = "Frontend engineer";

export function ProfilePage() {
  return (
    <article>
      <header className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">
            {ROLE}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {NAME}
          </h1>
          <p className="mt-5 max-w-prose text-ink-muted">
            I build interfaces with React and TypeScript, and I am currently
            working my way down the stack — Node, Express, Postgres.
          </p>
        </div>

        <Avatar src="/me.jpg" name={NAME} />
      </header>

      <section className="mt-14">
        <h2 className="text-xs uppercase tracking-[0.2em] text-ink-muted">
          Now
        </h2>
        <ul className="mt-5 flex flex-col gap-3 text-ink-muted">
          <li className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2.5 size-1 shrink-0 rounded-full bg-accent"
            />
            Learning backend development properly: layering, validation, auth.
          </li>
          <li className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-2.5 size-1 shrink-0 rounded-full bg-accent"
            />
            Building this portfolio in React 19, Vite and Tailwind.
          </li>
        </ul>
      </section>

      <nav aria-label="Sections" className="mt-14 flex flex-wrap gap-3">
        <Link
          to="/projects"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-canvas transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          See projects
        </Link>
        <Link
          to="/contact"
          className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Get in touch
        </Link>
      </nav>
    </article>
  );
}
