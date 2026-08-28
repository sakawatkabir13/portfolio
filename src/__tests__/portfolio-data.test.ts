import { describe, expect, it } from "vitest";
import { portfolio } from "@/data/portfolio";

describe("portfolio content", () => {
  it("contains the approved personal identity and contact links", () => {
    expect(portfolio.name).toBe("Mohammad Sakawat Kabir");
    expect(portfolio.handle).toBe("Basilisk13");
    expect(portfolio.email).toBe("tanveersakawat13@gmail.com");
    expect(portfolio.avatarUrl).toContain("avatars.githubusercontent.com/u/146334703");
    expect(portfolio.links.github).toBe("https://github.com/sakawatkabir13");
    expect(portfolio.links.linkedin).toBe("https://www.linkedin.com/in/s-kbr13");
    expect(portfolio.links.codeforces).toBe("https://codeforces.com/profile/s_kbr13");
  });

  it("contains education, competitive programming, and certification details", () => {
    expect(portfolio.title).toBe("Security-Focused Backend & Systems Developer");
    expect(portfolio.cybersecPrimary).toBe("Penetration Testing Labs");
    expect(portfolio.motoTags).toEqual([
      "Penetration Testing Labs",
      "Secure Backend Systems",
      "Networking",
      "DevOps, Linux & Cloud Infrastructure",
      "Competitive Programming"
    ]);
    expect(portfolio.motoTags).not.toContain("Threat Intel Tinkerer");
    expect(portfolio.motoTags).not.toContain("Red Team Curious");
    expect(portfolio.motoTags).not.toContain("CSE Student");
    expect(portfolio.motoTags).not.toContain("Ethical Hacking Enthusiast");
    expect(portfolio.motoTags).not.toContain("Aspiring Penetration Tester");
    expect(portfolio.education.institution).toBe(
      "Chittagong University of Engineering & Technology"
    );
    expect(portfolio.education.status).toBe(
      "Third-year B.Sc. student in Computer Science and Engineering"
    );
    expect(portfolio.education.studentStatus).toBe("Third-year CSE student");
    expect(portfolio.technicalSkills.map((group) => group.label)).toEqual([
      "Languages",
      "Backend & Data Engineering",
      "Security & Networking",
      "DevOps, Systems & Infrastructure"
    ]);
    expect(portfolio.technicalSkills.flatMap((group) => group.items)).toEqual(
      expect.arrayContaining([
        "Python",
        "FastAPI",
        "ETL",
        "Data Modeling",
        "Data Cleaning",
        "Data Validation",
        "Scapy",
        "DNS",
        "TCP/IP",
        "Linux",
        "AWS EC2",
        "GitHub Actions",
        "CI/CD"
      ])
    );

    const cinemaSeat = portfolio.projects.find((project) => project.slug === "cinemaseat");
    expect(cinemaSeat?.stack).toEqual(
      expect.arrayContaining(["GitHub Actions", "CI/CD"])
    );
    expect(portfolio.competitiveProgramming.solvedProblems).toBe("500+");
    expect(portfolio.competitiveProgramming.codeforcesUsername).toBe("s_kbr13");
    expect(portfolio.competitiveProgramming.codeforcesRank).toBe("Pupil");
    expect(portfolio.competitiveProgramming.codeforcesRating).toBe(1201);
    expect(portfolio.competitiveProgramming.codeforcesMaxRating).toBe(1226);
    expect(portfolio.certifications.length).toBeGreaterThanOrEqual(3);
    expect(portfolio.certifications[0]).toMatchObject({
      name: "Hacker Holidays",
      issuer: "TryHackMe"
    });
    expect(portfolio.certifications[0].credentialUrl).toContain("THM-WSXL8QIXRZ");
    expect(portfolio.certifications[1]).toMatchObject({
      name: "Data Engineer Associate",
      issuer: "DataCamp",
      credentialUrl: "https://www.datacamp.com/certificate/DEA0011268715074"
    });
    const networkPlus = portfolio.certifications.find((c) =>
      c.name.startsWith("CompTIA Network+")
    );
    expect(networkPlus).toBeDefined();
    expect(networkPlus?.issuer).toBe("CBT Nuggets");
    expect(networkPlus?.name).toContain("Certificate of Completion");
    expect(networkPlus?.credentialUrl).toMatch(
      /\/comptia-network-plus-cbt-nuggets\.pdf$/
    );
  });

  it("contains TryHackMe and Hack The Box stats", () => {
    expect(portfolio.platforms.tryHackMe).toMatchObject({
      username: "Basilisk13",
      percentile: "Top 4%",
      tier: "MAGE",
      globalRank: 96056,
      streak: 91,
      completedRooms: 102,
      badges: 12
    });
    expect(portfolio.platforms.hackTheBox).toMatchObject({
      username: "Basilisk13",
      rank: "Script Kiddie",
      points: 8,
      userOwns: 4,
      systemOwns: 4
    });
  });

  it("features the selected 13 public projects and the new pillars", () => {
    expect(portfolio.projects.length).toBe(13);
    const projectSlugs = portfolio.projects.map((project) => project.slug);

    expect(projectSlugs).toContain("basilisk-shell");
    expect(projectSlugs).toContain("full-custom-dns-spoofer-with-scapy");
    expect(projectSlugs).toContain("hermes-cloud-agent-lab");
    expect(projectSlugs).toContain("self-hosted-cloud-server");
    expect(projectSlugs).toContain("agrilink");
    expect(projectSlugs).toContain("discord-music-bot");
    expect(projectSlugs).toContain("spandan");
    expect(projectSlugs).toContain("cuet-insights");
    expect(projectSlugs).toContain("cuet-jam");
    expect(projectSlugs).toContain("cinemaseat");
    expect(projectSlugs).toContain(
      "real-time-cyber-attack-monitoring-and-threat-intelligence-platform"
    );
    expect(projectSlugs).not.toContain("devops-journey");
    expect(projectSlugs).not.toContain("sakawatkabir13");
    for (const project of portfolio.projects) {
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.href).toMatch(/^https:\/\/github\.com\/sakawatkabir13\//);
      expect(Array.isArray(project.stack)).toBe(true);
    }
    expect(portfolio.platforms.github.totalRepos).toBe(15);
    expect(portfolio.platforms.github.topLanguages).toContain("Python");
    expect(portfolio.platforms.github.achievements).toContain("YOLO");
  });

  it("contains journey, achievement, and CTF challenge data", () => {
    expect(portfolio.journey.length).toBeGreaterThanOrEqual(10);
    expect(portfolio.journey.map((entry) => entry.title)).toEqual([
      "1st Runner-Up · Zero to Production Hackathon",
      "Real-Time Cyber Attack Monitoring & Threat Intelligence Platform",
      "TryHackMe: MAGE tier · Top 4%",
      "Hack The Box: Script Kiddie",
      "Self-Hosted Cloud Server",
      "Full Custom DNS Spoofer with Scapy",
      "Hermes Cloud Agent Lab",
      "Data Engineer Associate (DataCamp)",
      "Basilisk Shell",
      "TryHackMe: Top 15%",
      "CompTIA Network+ (N10-009)",
      "111th Place — CUET IUPC 2025",
      "Codeforces Pupil Rank",
      "Honorable Mention — ICPC Asia Dhaka Preliminary 2024",
      "7th Place — Junior Programming Contest",
      "Competitive Programming Origin"
    ]);
    expect(portfolio.journey.map(({ year, month }) => `${year}-${month}`)).toEqual([
      "2026-Aug",
      "2026-Aug",
      "2026-Jul",
      "2026-Apr",
      "2026-Mar",
      "2026-Mar",
      "2026-Feb",
      "2026-Feb",
      "2026-Feb",
      "2026-Jan",
      "2025-Dec",
      "2025-Dec",
      "2025-Mar",
      "2024-Nov",
      "2024-Mar",
      "2023-Oct"
    ]);
    for (const entry of portfolio.journey) {
      expect(["milestone", "tool", "finding", "cert"]).toContain(entry.type);
      expect(entry.title.length).toBeGreaterThan(0);
    }
    const icpc = portfolio.journey.find((j) => j.title.includes("ICPC"));
    expect(icpc).toBeDefined();
    expect(icpc?.tags).toContain("icpc");
    const networkPlus = portfolio.journey.find((j) => j.title.startsWith("CompTIA"));
    expect(networkPlus).toBeDefined();
    expect(portfolio.achievements[0]).toMatchObject({
      title: "1st Runner-Up — Zero to Production",
      credentialUrl: "/certificates/zero-to-production-runner-up.pdf"
    });
    expect(portfolio.achievements.map((achievement) => achievement.title)).toEqual([
      "1st Runner-Up — Zero to Production",
      "111th Place — CUET IUPC 2025",
      "Honorable Mention — ICPC Asia Dhaka Preliminary 2024",
      "7th Place — Junior Programming Contest"
    ]);
    expect(portfolio.achievements.find((achievement) => achievement.title.includes("ICPC"))).toMatchObject({
      credentialUrl: "/certificates/icpc-2024-dhaka-preliminary-honorable.pdf"
    });
    expect(portfolio.ctf.challenges.length).toBe(3);
    for (const challenge of portfolio.ctf.challenges) {
      // expectedHash must be a 64-char lowercase hex string (SHA-256)
      expect(challenge.expectedHash).toMatch(/^[0-9a-f]{64}$/);
    }
    expect(portfolio.liveStatus.line2).toContain("INTERNSHIPS");
  });
});
