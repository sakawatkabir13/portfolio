"use client";

import React from "react";
import { ActivityCalendar } from "react-activity-calendar";
import "react-activity-calendar/tooltips.css";

import type { ContributionDay } from "@/lib/github-contributions";

const calendarTheme = {
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]
};

type Props = {
  data: ContributionDay[];
  username: string;
  profileUrl: string;
};

export function ContributionHeatmap({ data, username, profileUrl }: Props) {
  if (data.length === 0) {
    return (
      <div className="mt-5 border border-line/60 bg-canvas/40 p-6 text-sm text-zinc-400">
        Contribution graph is currently unavailable. Visit{" "}
        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-mint underline-offset-2 hover:underline"
        >
          github.com/{username}
        </a>{" "}
        directly for live activity.
      </div>
    );
  }

  return (
    <div className="mt-5 overflow-x-auto">
      <ActivityCalendar
        data={data.map((d) => ({
          date: d.date,
          count: d.count,
          level: d.level
        }))}
        colorScheme="dark"
        theme={calendarTheme}
        blockSize={11}
        blockMargin={3}
        fontSize={12}
        labels={{
          totalCount: "{{count}} contributions in the last year"
        }}
        style={{ color: "#a1a1aa" }}
      />
    </div>
  );
}
