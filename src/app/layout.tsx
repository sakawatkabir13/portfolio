import type { Metadata } from "next";
import "./globals.css";
import { MatrixRain } from "@/components/background/MatrixRain";

const SITE_URL = "https://basilisk13.sakawatkabir.me";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mohammad Sakawat Kabir | Portfolio",
    template: "%s · Mohammad Sakawat Kabir"
  },
  description:
    "Security-focused backend and systems developer, competitive programmer, and CSE undergraduate with hands-on experience in penetration testing, networking, backend engineering, and AWS infrastructure.",
  applicationName: "Basilisk13 Portfolio",
  authors: [{ name: "Mohammad Sakawat Kabir" }],
  keywords: [
    "Mohammad Sakawat Kabir",
    "Basilisk13",
    "Penetration Tester",
    "Backend Developer",
    "Systems Developer",
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
      "Security-focused backend and systems developer, competitive programmer, and CSE undergraduate with hands-on experience in penetration testing, networking, backend engineering, and AWS infrastructure."
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Sakawat Kabir | Portfolio",
    description:
      "Security-focused backend and systems developer, competitive programmer, and CSE undergraduate with hands-on experience in penetration testing, networking, backend engineering, and AWS infrastructure."
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
      "@type": "College",
      name: "Chittagong University of Engineering & Technology"
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Chittagong University of Engineering & Technology"
    },
    knowsAbout: [
      "Cybersecurity",
      "Penetration Testing",
      "Networking",
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
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <MatrixRain className="opacity-[0.35]" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
