import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PostCard } from "@/components/blog/PostCard";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";
import { getAllPosts } from "@/lib/posts";

const BLOG_NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writeups", active: true },
  { href: "/#contact", label: "Contact" }
];

export const metadata = {
  title: "Writeups & Notes",
  description:
    "CTF write-ups, CVE briefs, and notes from hands-on security labs, defensive research, and systems engineering."
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <SiteNav items={BLOG_NAV_ITEMS} />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-canvas/70 text-zinc-100 outline-none backdrop-blur-[1px]">
        <div className="relative">
        <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 lg:py-20">
          <div className="mb-8 border-l-4 border-rose pl-5">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">Writing</p>
            <h1 className="mt-3 text-4xl font-bold tracking-normal text-ink sm:text-5xl">
              Writeups &amp; Notes
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">
              CTF write-ups, CVE briefs, and notes from hands-on security labs, defensive
              research, and systems engineering. I publish when I finish something worth
              sharing.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="border border-line bg-surface p-8 text-center text-zinc-400">
              <p className="font-mono text-sm">No posts yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal key={post.slug} delay={Math.min(index * 0.04, 0.18)}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-line bg-surface-soft px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-ember hover:text-ember"
            >
              <ArrowUpRight className="h-4 w-4 rotate-180" />
              Back to home
            </Link>
          </div>
        </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
