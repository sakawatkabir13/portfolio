import Link from "next/link";
import React from "react";
import type { PostMeta } from "@/lib/posts";
import { categoryLabel, formatPostDate } from "@/lib/posts";
import { TagPill } from "@/components/blog/TagPill";

type PostCardProps = {
  post: PostMeta;
};

function categoryAccent(category: PostMeta["category"]): string {
  switch (category) {
    case "writeup":
      return "border-mint/30 bg-mint/10 text-mint";
    case "cve":
      return "border-rose/30 bg-rose/10 text-rose";
    case "blog":
      return "border-ember/30 bg-ember/10 text-ember";
  }
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-rose/70 hover:shadow-rose"
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center border px-2.5 py-1 font-mono text-xs uppercase tracking-[0.22em] ${categoryAccent(
            post.category
          )}`}
        >
          {categoryLabel(post.category)}
        </span>
        <span className="font-mono text-xs text-zinc-400">{formatPostDate(post.date)}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-ink group-hover:text-rose">{post.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-zinc-400">{post.excerpt}</p>
      <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
        {post.tags.map((tag) => (
          <TagPill key={tag} tag={tag} />
        ))}
      </div>
    </Link>
  );
}
