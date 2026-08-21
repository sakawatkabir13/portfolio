import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostCategory = "writeup" | "cve" | "blog";

export type PostFrontmatter = {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  category: PostCategory;
  cover?: string;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
};

export type Post = {
  meta: PostMeta;
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

function readPostFile(slug: string): Post | null {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<PostFrontmatter>;

  if (!fm.title || !fm.date || !fm.excerpt || !fm.category) {
    throw new Error(`Post ${slug} is missing required frontmatter (title, date, excerpt, category).`);
  }

  return {
    meta: {
      slug,
      title: fm.title,
      date: fm.date,
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      excerpt: fm.excerpt,
      category: fm.category,
      cover: fm.cover
    },
    content
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  const posts: PostMeta[] = [];
  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const post = readPostFile(slug);
    if (post) {
      posts.push(post.meta);
    }
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  return readPostFile(slug);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return iso;
  }
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function categoryLabel(category: PostCategory): string {
  switch (category) {
    case "writeup":
      return "Writeup";
    case "cve":
      return "CVE Brief";
    case "blog":
      return "Blog";
  }
}
