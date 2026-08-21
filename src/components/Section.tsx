import React from "react";

type SectionProps = {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  id?: string;
};

export function Section({ eyebrow, title, children, id }: SectionProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 lg:py-20">
      <div className="mb-8 border-l-4 border-rose pl-5">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-bold tracking-normal text-ink sm:text-4xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}
