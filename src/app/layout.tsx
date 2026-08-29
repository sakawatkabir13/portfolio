import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BackgroundEffects } from "@/components/background/BackgroundEffects";

const SITE_URL = "https://basilisk13.sakawatkabir.me";

const notoSans = localFont({
  src: [
    { path: "./fonts/noto-sans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/noto-sans-700.woff2", weight: "700", style: "normal" }
  ],
  variable: "--font-noto-sans",
  display: "swap"
});

const dejaVuSansMono = localFont({
  src: [
    { path: "./fonts/dejavu-sans-mono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dejavu-sans-mono-700.woff2", weight: "700", style: "normal" }
  ],
  variable: "--font-dejavu-sans-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mohammad Sakawat Kabir | Portfolio",
    template: "%s · Mohammad Sakawat Kabir"
  },
  description:
    "Security-focused backend and systems developer and CSE undergraduate with hands-on experience in penetration testing, DevOps, networking, Linux, Docker, AWS infrastructure, and competitive programming.",
  applicationName: "Basilisk13 Portfolio",
  authors: [{ name: "Mohammad Sakawat Kabir" }],
  keywords: [
    "Mohammad Sakawat Kabir",
    "Basilisk13",
    "Penetration Tester",
    "Backend Developer",
    "Systems Developer",
    "DevOps",
    "Docker",
    "Cloud Infrastructure",
    "Cybersecurity",
    "Networking",
    "AWS",
    "Competitive Programmer",
    "TryHackMe",
    "Hack The Box",
    "CTF",
    "CUET"
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Basilisk13 Portfolio",
    title: "Mohammad Sakawat Kabir | Portfolio",
    description:
      "Security-focused backend and systems developer and CSE undergraduate with hands-on experience in penetration testing, DevOps, networking, Linux, Docker, AWS infrastructure, and competitive programming."
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Sakawat Kabir | Portfolio",
    description:
      "Security-focused backend and systems developer and CSE undergraduate with hands-on experience in penetration testing, DevOps, networking, Linux, Docker, AWS infrastructure, and competitive programming."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohammad Sakawat Kabir",
    alternateName: "Basilisk13",
    jobTitle: "Security-Focused Backend & Systems Developer",
    url: SITE_URL,
    email: "mailto:tanveersakawat13@gmail.com",
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Chittagong University of Engineering & Technology"
    },
    knowsAbout: [
      "Cybersecurity",
      "Penetration Testing",
      "Networking",
      "DevOps",
      "Containerization",
      "Cloud Infrastructure",
      "Linux",
      "Python",
      "Competitive Programming"
    ],
    sameAs: [
      "https://github.com/sakawatkabir13",
      "https://www.linkedin.com/in/s-kbr13",
      "https://tryhackme.com/p/Basilisk13",
      "https://app.hackthebox.com/users/3214075"
    ]
  };

  return (
    <html lang="en" className={`${notoSans.variable} ${dejaVuSansMono.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <BackgroundEffects />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
