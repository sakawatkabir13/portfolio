import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

class TestIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];

  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve() {}
}

globalThis.IntersectionObserver = TestIntersectionObserver;

// Stub the GitHub contribution heatmap client component so jsdom (used by the
// home-page render test) doesn't have to load the real ESM-only
// react-activity-calendar bundle, which expects a real browser.
vi.mock("@/components/sections/ContributionHeatmap", () => ({
  ContributionHeatmap: () => null
}));
