import { describe, expect, it } from "vitest";
import { getAllPosts, getPostBySlug, getAllSlugs, categoryLabel } from "@/lib/posts";

describe("blog content layer", () => {
  it("lists posts sorted by date descending", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
    for (let i = 1; i < posts.length; i++) {
      expect(posts[i - 1].date >= posts[i].date).toBe(true);
    }
  });

  it("returns required frontmatter fields", () => {
    const posts = getAllPosts();
    for (const post of posts) {
      expect(post.title.length).toBeGreaterThan(0);
      expect(post.excerpt.length).toBeGreaterThan(0);
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}/);
      expect(["writeup", "cve", "blog"]).toContain(post.category);
      expect(Array.isArray(post.tags)).toBe(true);
    }
  });

  it("exposes all slugs for static params", () => {
    const slugs = getAllSlugs();
    expect(slugs.length).toBeGreaterThan(0);
    expect(slugs).toContain("dns-spoofing-lab");
    expect(slugs).toContain("cve-2025-0282-ivanti");
  });

  it("loads a post by slug", () => {
    const post = getPostBySlug("dns-spoofing-lab");
    expect(post).not.toBeNull();
    expect(post?.meta.title).toContain("DNS Spoofing");
    expect(post?.content).toContain("scapy");
  });

  it("returns null for unknown slug", () => {
    expect(getPostBySlug("does-not-exist")).toBeNull();
  });

  it("labels categories", () => {
    expect(categoryLabel("writeup")).toBe("Writeup");
    expect(categoryLabel("cve")).toBe("CVE Brief");
    expect(categoryLabel("blog")).toBe("Blog");
  });
});
