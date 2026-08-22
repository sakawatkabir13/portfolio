import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  BACKGROUND_MODE_EVENT,
  BACKGROUND_MODE_STORAGE_KEY,
  nextBackgroundMode,
  readBackgroundMode
} from "@/components/background/background-mode";
import { SiteNav } from "@/components/layout/SiteNav";

describe("portfolio background modes", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("uses Network by default and preserves the legacy off preference", () => {
    expect(readBackgroundMode(window.localStorage)).toBe("network");

    window.localStorage.setItem("matrix-rain-enabled", "false");
    expect(readBackgroundMode(window.localStorage)).toBe("off");

    window.localStorage.setItem(BACKGROUND_MODE_STORAGE_KEY, "matrix");
    expect(readBackgroundMode(window.localStorage)).toBe("matrix");
  });

  it("cycles through Network, Matrix, and Off", () => {
    expect(nextBackgroundMode("network")).toBe("matrix");
    expect(nextBackgroundMode("matrix")).toBe("off");
    expect(nextBackgroundMode("off")).toBe("network");
  });

  it("persists and broadcasts changes from the navigation control", () => {
    const onModeChange = vi.fn();
    window.addEventListener(BACKGROUND_MODE_EVENT, onModeChange);
    render(<SiteNav items={[{ href: "#projects", label: "Projects" }]} />);

    const control = screen.getByRole("button", {
      name: /background mode: network\. switch to matrix/i
    });
    expect(control.textContent).toMatch(/bg network/i);

    fireEvent.click(control);
    expect(window.localStorage.getItem(BACKGROUND_MODE_STORAGE_KEY)).toBe("matrix");
    expect(screen.getByRole("button", { name: /background mode: matrix\. switch to off/i })).toBeTruthy();
    expect(onModeChange).toHaveBeenCalledTimes(1);

    window.removeEventListener(BACKGROUND_MODE_EVENT, onModeChange);
  });
});
