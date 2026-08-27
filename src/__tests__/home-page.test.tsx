import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import Home from "@/app/page";

// Avoid hitting GitHub from the test runner. The real implementation lives
// in @/lib/github-contributions.
vi.mock("@/lib/github-contributions", () => ({
  fetchGitHubContributions: async () => ({
    username: "sakawatkabir13",
    total: 0,
    days: [],
    fetchedAt: new Date().toISOString()
  })
}));

vi.mock("@/lib/github-profile", () => ({
  fetchGitHubProfileStats: async () => ({
    publicRepos: 15,
    totalStars: 5,
    followers: 3,
    following: 3,
    topLanguages: ["Python", "TypeScript", "Java", "CSS", "Shell"],
    fetchedAt: new Date().toISOString()
  })
}));

describe("home page", () => {
  it("renders the approved portfolio content", async () => {
    const ui = await Home();
    render(ui);

    expect(screen.getByRole("heading", { name: /mohammad sakawat kabir/i })).toBeTruthy();
    expect(screen.getAllByText(/backend & systems developer/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/basilisk shell/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/data engineer associate/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/top 4%/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/script kiddie/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/1st runner-up/i).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/third-year b\.sc\. student in computer science and engineering/i)
        .length
    ).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /view résumé/i }).getAttribute("href")).toBe("/resume.pdf");
  });

  it("renders the new sections from the v2 upgrade", async () => {
    const ui = await Home();
    render(ui);

    expect(screen.getAllByText(/\$ whoami/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/engineering evidence from shipped work/i)).toBeNull();
    expect(screen.getAllByText(/tools i use to build and secure systems/i).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /^skills$/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /^toolkit$/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/recent milestones and shipped work/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/latest writeups & notes/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/capture the flag/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/researcher'?s toolkit/i).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("heading", { name: /three challenges hidden/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("navigation", { name: /primary navigation/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /open navigation menu/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /background mode: network/i })).toBeTruthy();
  });
});
