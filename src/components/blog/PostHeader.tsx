import React from "react";
import type { PostMeta } from "@/lib/posts";
import { categoryLabel, formatPostDate } from "@/lib/posts";
import { TagPill } from "@/components/blog/TagPill";

type PostHeaderProps = {
  post: PostMeta;
};

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="border-b border-line pb-8">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-ember">
        {categoryLabel(post.category)} · {formatPostDate(post.date)}
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-normal text-ink sm:text-5xl">{post.title}</h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">{post.excerpt}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <TagPill key={tag} tag={tag} />
        ))}
      </div>
    </header>
  );
}
