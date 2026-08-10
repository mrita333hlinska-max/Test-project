type EmptyStateProps = {
  title: string;
  hint: string;
};

/** Placeholder body for the routes that exist but have no content yet. */
export function EmptyState({ title, hint }: EmptyStateProps) {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-4 max-w-prose text-ink-muted">{hint}</p>
      <div className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center text-sm text-ink-muted">
        Nothing here yet.
      </div>
    </section>
  );
}
