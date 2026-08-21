import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mohammad Sakawat Kabir | Security-Focused Backend & Systems Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraph() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0c1014",
          padding: 64,
          fontFamily: "monospace",
          color: "#f4f4f5"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            color: "#f43f5e",
            letterSpacing: 4,
            textTransform: "uppercase"
          }}
        >
          <span style={{ color: "#34d399" }}>~/</span>
          <span>basilisk13</span>
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}
        >
          <div style={{ fontSize: 72, fontWeight: 900, color: "#f4f4f5", lineHeight: 1.05 }}>
            Mohammad Sakawat Kabir
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#f43f5e" }}>
            Security-Focused Backend & Systems Developer
          </div>
          <div style={{ fontSize: 26, color: "#a1a1aa", maxWidth: 1000 }}>
            CSE Student · Competitive Programmer · Security · Backend · Systems
          </div>
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 22,
            color: "#34d399",
            textTransform: "uppercase",
            letterSpacing: 4
          }}
        >
          <span>TryHackMe MAGE</span>
          <span style={{ color: "#52525b" }}>·</span>
          <span>Hack The Box</span>
          <span style={{ color: "#52525b" }}>·</span>
          <span>CTF</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
