import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";

const NOT_FOUND_NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writeups" },
  { href: "/#contact", label: "Contact" }
];

export const metadata: Metadata = {
  title: "Page not found"
};

export default function NotFound() {
  return (
    <>
      <SiteNav items={NOT_FOUND_NAV_ITEMS} />
      <main
        id="main-content"
        tabIndex={-1}
        className="grid min-h-[65vh] place-items-center px-5 py-20 text-center outline-none"
      >
        <div className="border border-line bg-surface/90 p-8 backdrop-blur sm:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-ember">
            error 404
          </p>
          <h1 className="mt-4 text-4xl font-bold text-ink">Page not found</h1>
          <p className="mx-auto mt-4 max-w-md leading-7 text-zinc-400">
            The page may have moved, or the address may be incorrect.
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 border border-mint/50 bg-mint/10 px-4 py-2.5 font-mono text-sm uppercase tracking-[0.16em] text-mint transition hover:bg-mint hover:text-canvas"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Return home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
