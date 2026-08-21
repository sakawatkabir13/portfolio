import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { PostHeader } from "@/components/blog/PostHeader";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";

const BLOG_NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writeups", active: true },
  { href: "/#contact", label: "Contact" }
];

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: "Not found | Mohammad Sakawat Kabir" };
  }
  return {
    title: `${post.meta.title} | Mohammad Sakawat Kabir`,
    description: post.meta.excerpt
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="text-3xl font-bold text-ink">Post not found</h1>
        <Link href="/blog" className="mt-6 inline-block text-rose hover:text-ember">
          Back to all posts
        </Link>
      </main>
    );
  }

  return (
    <>
      <SiteNav items={BLOG_NAV_ITEMS} showMatrixToggle={false} />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-canvas text-zinc-100 outline-none">
        <div className="relative">
        <article className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 lg:py-20">
          <PostHeader post={post.meta} />
          <div className="prose-cyber mt-10">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypeAutolinkHeadings,
                      { behavior: "wrap", properties: { className: ["heading-anchor"] } }
                    ]
                  ]
                }
              }}
            />
          </div>
          <div className="mt-12 border-t border-line pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-rose hover:text-ember"
            >
              <ArrowUpRight className="h-4 w-4 rotate-180" />
              Back to all posts
            </Link>
          </div>
        </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
