import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  copy,
  id,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  id?: string;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      )}
      <h2 id={id} className="text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      {copy && <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{copy}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.14),transparent_35%),radial-gradient(circle_at_85%_70%,hsl(var(--accent)/0.12),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <p className="mb-5 inline-flex items-center rounded-full border bg-card/70 px-3 py-1.5 text-xs font-semibold text-primary">
          {eyebrow}
        </p>
        <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{intro}</p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function DraftBanner({ note }: { note: string }) {
  return (
    <div className="border-b bg-accent/10">
      <div className="mx-auto max-w-7xl px-5 py-3 text-sm text-foreground md:px-8">
        <strong className="font-semibold">Draft page.</strong> {note}
      </div>
    </div>
  );
}
