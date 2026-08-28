export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  href: string;
  category: string;
  featured?: boolean;
  problem?: string;
  build?: string;
  evidence?: string;
  stars?: number;
};

export const portfolio = {
  name: "Mohammad Sakawat Kabir",
  handle: "Basilisk13",
  email: "tanveersakawat13@gmail.com",
  avatarUrl: "https://avatars.githubusercontent.com/u/146334703?v=4",
  title: "Security-Focused Backend & Systems Developer",
  tagline:
    "Computer Science undergraduate building, deploying, and securing real-world systems across backend engineering, penetration testing, networking, DevOps, and self-hosted AWS infrastructure.",
  location: "Bangladesh",
  links: {
    github: "https://github.com/sakawatkabir13",
    linkedin: "https://www.linkedin.com/in/s-kbr13",
    tryHackMe: "https://tryhackme.com/p/Basilisk13",
    hackTheBox: "https://app.hackthebox.com/users/3214075",
    codeforces: "https://codeforces.com/profile/s_kbr13",
    email: "mailto:tanveersakawat13@gmail.com",
    resume: "/resume.pdf"
  },
  about:
    "I build, deploy, and operate dependable backend and infrastructure systems, then test and harden them through hands-on security work.",
  education: {
    status: "Third-year B.Sc. student in Computer Science and Engineering",
    studentStatus: "Third-year CSE student",
    institution: "Chittagong University of Engineering & Technology",
    department: "Computer Science and Engineering"
  },
  competitiveProgramming: {
    solvedProblems: "500+",
    codeforcesUsername: "s_kbr13",
    codeforcesRank: "Pupil",
    codeforcesRating: 1201,
    codeforcesMaxRating: 1226,
    contest: "111th Place · CUET IUPC 2025",
    juniorContest: "7th Place · CUET Junior Programming Contest"
  },
  platforms: {
    tryHackMe: {
      username: "Basilisk13",
      percentile: "Top 4%",
      tier: "MAGE",
      globalRank: 96056,
      streak: 91,
      completedRooms: 102,
      badges: 12,
      profileUrl: "https://tryhackme.com/p/Basilisk13"
    },
    hackTheBox: {
      username: "Basilisk13",
      rank: "Script Kiddie",
      points: 8,
      userOwns: 4,
      systemOwns: 4,
      respects: 1
    },
    github: {
      username: "sakawatkabir13",
      profileUrl: "https://github.com/sakawatkabir13",
      achievements: ["YOLO", "Pull Shark"],
      followers: 3,
      following: 3,
      totalRepos: 15,
      topLanguages: ["Python", "TypeScript", "Java", "CSS", "Shell"]
    }
  },
  certifications: [
    {
      name: "Hacker Holidays",
      issuer: "TryHackMe",
      credentialUrl:
        "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-WSXL8QIXRZ.pdf",
      focus:
        "Seasonal red-team / blue-team challenge rooms covering web exploitation, forensics, networking, and cryptography.",
      issuedAt: "Aug 2026"
    },
    {
      name: "Data Engineer Associate",
      issuer: "DataCamp",
      credentialUrl: "https://www.datacamp.com/certificate/DEA0011268715074",
      focus:
        "Data management theory, database schemas and design, SQL extraction and aggregation, data cleaning, and data quality validation.",
      issuedAt: "Feb 2026"
    },
    {
      name: "CompTIA Network+ (N10-009) — Certificate of Completion",
      issuer: "CBT Nuggets",
      credentialUrl: "/comptia-network-plus-cbt-nuggets.pdf",
      focus:
        "Certificate of completion issued by CBT Nuggets for the CompTIA Network+ (N10-009) course — covering OSI & TCP/IP, subnetting, routing & switching, wireless, and network security troubleshooting.",
      issuedAt: "Dec 2025"
    }
  ],
  cybersecPrimary: "Penetration Testing Labs",
  motoTags: [
    "Penetration Testing Labs",
    "Secure Backend Systems",
    "Networking",
    "DevOps, Linux & Cloud Infrastructure",
    "Competitive Programming"
  ],
  technicalSkills: [
    {
      label: "Languages",
      items: ["Python", "C", "C++", "C#", "Java", "TypeScript", "Bash"]
    },
    {
      label: "Backend & Data Engineering",
      items: [
        "FastAPI",
        "Django",
        "Spring Boot",
        "PostgreSQL",
        "MySQL",
        "Redis",
        "SQL",
        "ETL",
        "Data Modeling",
        "Data Cleaning",
        "Data Validation"
      ]
    },
    {
      label: "Security & Networking",
      items: [
        "Penetration Testing",
        "Network Traffic Analysis",
        "Threat Detection",
        "Scapy",
        "eBPF/BCC"
      ]
    },
    {
      label: "DevOps, Systems & Infrastructure",
      items: [
        "Linux",
        "Docker",
        "AWS EC2",
        "Git",
        "GitHub Actions",
        "CI/CD",
        "Nginx Proxy Manager",
        "Twingate"
      ]
    }
  ],
  achievements: [
    {
      title: "1st Runner-Up — Zero to Production",
      organization: "IEEE Computer Society CUET × Poridhi.io",
      issuedAt: "Aug 2026",
      description:
        "Built CinemaSeat with team Cuet cryptic_knights: a concurrency-safe booking system designed so the same seat cannot be sold twice.",
      credentialUrl: "/certificates/zero-to-production-runner-up.pdf"
    },
    {
      title: "111th Place — CUET IUPC 2025",
      organization: "CUET CSE FEST",
      issuedAt: "Dec 2025",
      description:
        "Competed against university teams from across Bangladesh in the CUET CSE FEST 2025 Inter-University Programming Contest, placing 111th."
    },
    {
      title: "Honorable Mention — ICPC Asia Dhaka Preliminary 2024",
      organization: "ICPC",
      issuedAt: "Nov 2024",
      description:
        "Competed in the ICPC Asia Dhaka Preliminary 2024 and received an Honorable Mention.",
      credentialUrl: "/certificates/icpc-2024-dhaka-preliminary-honorable.pdf"
    },
    {
      title: "7th Place — Junior Programming Contest",
      organization: "CUET Computer Club",
      issuedAt: "Mar 2024",
      description:
        "Placed seventh in the intra-university Junior Programming Contest organized by the CUET Computer Club."
    }
  ],
  journey: [
    {
      year: "2026",
      month: "Aug",
      type: "milestone",
      title: "1st Runner-Up · Zero to Production Hackathon",
      description:
        "Built CinemaSeat with team Cuet cryptic_knights and placed 1st Runner-Up in the IEEE Computer Society CUET × Poridhi.io hackathon.",
      tags: ["hackathon", "cinemaseat", "concurrency"]
    },
    {
      year: "2026",
      month: "Aug",
      type: "tool",
      title: "Real-Time Cyber Attack Monitoring & Threat Intelligence Platform",
      description:
        "Self-hosted cyber attack monitoring platform with hybrid rule + ML detection for SQLi, XSS, brute-force, and DDoS.",
      tags: ["typescript", "ml", "security"]
    },
    {
      year: "2026",
      month: "Jul",
      type: "milestone",
      title: "TryHackMe: MAGE tier · Top 4%",
      description:
        "Unlocked the MAGE tier and reached the global Top 4% on TryHackMe.",
      tags: ["thm", "mage"]
    },
    {
      year: "2026",
      month: "Apr",
      type: "milestone",
      title: "Hack The Box: Script Kiddie",
      description:
        "Earned 4 user owns and 4 system owns, reaching the Script Kiddie rank.",
      tags: ["htb", "lab"]
    },
    {
      year: "2026",
      month: "Mar",
      type: "tool",
      title: "Self-Hosted Cloud Server",
      description:
        "Containerized private cloud with Nextcloud, MariaDB, Pi-hole, Nginx Proxy Manager, and Twingate.",
      tags: ["docker", "self-hosted"]
    },
    {
      year: "2026",
      month: "Mar",
      type: "tool",
      title: "Full Custom DNS Spoofer with Scapy",
      description:
        "Educational Scapy toolkit for isolated lab environments: ARP spoofing, sniffing, DNS interception.",
      tags: ["scapy", "security", "lab"]
    },
    {
      year: "2026",
      month: "Feb",
      type: "tool",
      title: "Hermes Cloud Agent Lab",
      description:
        "Reproducible personal AI agent stack on AWS EC2 with Telegram gateway, Ollama, model routing.",
      tags: ["aws", "ollama", "agents"]
    },
    {
      year: "2026",
      month: "Feb",
      type: "cert",
      title: "Data Engineer Associate (DataCamp)",
      description:
        "Earned the DataCamp Data Engineer Associate certification, validating SQL data extraction and aggregation, data cleaning, database design, and data quality practices.",
      tags: ["datacamp", "sql", "data engineering"]
    },
    {
      year: "2026",
      month: "Feb",
      type: "tool",
      title: "Basilisk Shell",
      description:
        "Built an AI-assisted Linux terminal assistant to convert natural language to audited Bash commands.",
      tags: ["python", "ai", "linux"]
    },
    {
      year: "2026",
      month: "Jan",
      type: "milestone",
      title: "TryHackMe: Top 15%",
      description:
        "Pushed to Top 15% on TryHackMe — 33 rooms, 3 badges, 13-day streak, 34 points.",
      tags: ["thm", "learning"]
    },
    {
      year: "2025",
      month: "Dec",
      type: "cert",
      title: "CompTIA Network+ (N10-009)",
      description:
        "Completed the CBT Nuggets CompTIA Network+ (N10-009) course, strengthening practical networking and troubleshooting skills.",
      tags: ["networking", "comptia"]
    },
    {
      year: "2025",
      month: "Dec",
      type: "milestone",
      title: "111th Place — CUET IUPC 2025",
      description:
        "Competed against university teams from across Bangladesh in the CUET CSE FEST 2025 Inter-University Programming Contest, placing 111th.",
      tags: ["cp", "contest"]
    },
    {
      year: "2025",
      month: "Mar",
      type: "milestone",
      title: "Codeforces Pupil Rank",
      description:
        "Reached Pupil on Codeforces after sustained practice across Division 2 and Division 3 contests.",
      tags: ["cp", "codeforces"]
    },
    {
      year: "2024",
      month: "Nov",
      type: "milestone",
      title: "Honorable Mention — ICPC Asia Dhaka Preliminary 2024",
      description:
        "Competed in the ICPC Asia Dhaka Preliminary 2024 and received an Honorable Mention.",
      tags: ["cp", "icpc"]
    },
    {
      year: "2024",
      month: "Mar",
      type: "milestone",
      title: "7th Place — Junior Programming Contest",
      description:
        "Placed seventh in the intra-university Junior Programming Contest organized by the CUET Computer Club.",
      tags: ["cp", "contest"]
    },
    {
      year: "2023",
      month: "Oct",
      type: "milestone",
      title: "Competitive Programming Origin",
      description:
        "Began competitive programming on online judges, developing algorithmic problem-solving under contest constraints.",
      tags: ["cp", "learning"]
    }
  ],
  ctf: {
    intro:
      "Three flags are hidden in this site. Inspect the source, decode the clues, submit below. Solve all three for a badge in the footer.",
    challenges: [
      {
        id: "base64-beacon",
        title: "Base64 Beacon",
        difficulty: "easy",
        hint:
          "A Base64 string is hiding somewhere in the HTML comments of this page. Decode it to find the flag.",
        // sha256("basilisk-shell")
        expectedHash:
          "c632dd0db67cc96131d7366647ca57bb85691231b91f6b2105b4051f761f68c1"
      },
      {
        id: "source-inspector",
        title: "Source Inspector",
        difficulty: "medium",
        hint:
          "A CSS class name in this site holds a clue encoded with ROT13. Find the class and decode it.",
        // sha256("basilisk-cyber")
        expectedHash:
          "87dee5843303eed767d3f5c0474279216ea49c9cd5f2755d9dd99d1feeec8d51"
      },
      {
        id: "console-broadcast",
        title: "Console Broadcast",
        difficulty: "medium",
        hint:
          "Open the browser developer console. A ROT13-encoded message is broadcasting from this site. Decode it.",
        // sha256("kali-basilisk")
        expectedHash:
          "42b7282753d21a3ec59c8b3c96fb665fa7a751161dc41890352c451e45d8424b"
      }
    ]
  },
  liveStatus: {
    line2: "OPEN TO SECURITY & BACKEND INTERNSHIPS"
  },
  projects: [
    {
      slug: "real-time-cyber-attack-monitoring-and-threat-intelligence-platform",
      title: "Real-Time Cyber Attack Monitoring & Threat Intelligence Platform",
      description:
        "Self-hosted real-time cyber attack monitoring and threat intelligence platform. Detects SQLi, XSS, brute-force and DDoS with a hybrid rule + ML engine, ships via lightweight log agent, and streams events to a live dashboard.",
      stack: ["TypeScript", "WebSocket", "ML", "Cybersecurity"],
      href: "https://github.com/sakawatkabir13/Real-time-cyber-attack-monitoring-and-threat-intelligence-platform",
      category: "Security Platform",
      featured: true,
      problem: "Security signals are fragmented across logs and difficult to triage in real time.",
      build:
        "Built a self-hosted detection pipeline with a lightweight log agent, hybrid rule + ML engine, WebSocket event stream, and live dashboard.",
      evidence: "Detects SQLi, XSS, brute-force, and DDoS activity.",
      stars: 0
    },
    {
      slug: "cinemaseat",
      title: "CinemaSeat",
      description:
        "A concurrency-safe movie-ticket booking platform with GitHub Actions CI/CD, built around one invariant: a seat is never sold twice, even under competing requests.",
      stack: ["TypeScript", "PostgreSQL", "Redis", "Concurrency", "GitHub Actions", "CI/CD"],
      href: "https://github.com/sakawatkabir13/CinemaSeat",
      category: "Awarded Hackathon Project",
      featured: true,
      problem: "Concurrent booking requests can sell the same seat twice.",
      build:
        "Combined Redis atomic holds (SET NX EX) with PostgreSQL unique constraints so double-booking is structurally prevented, then automated validation and delivery through GitHub Actions CI/CD.",
      evidence:
        "1st Runner-Up · Zero to Production Hackathon 2026 · Automated CI/CD with GitHub Actions.",
      stars: 0
    },
    {
      slug: "spandan",
      title: "Spandan",
      description:
        "A full-stack, AI-assisted appointment booking and chamber management system tailored for healthcare, with real-time queueing and smart symptom triage.",
      stack: ["Python", "React", "FastAPI", "PostgreSQL", "Groq"],
      href: "https://github.com/sakawatkabir13/spandan",
      category: "Web App",
      stars: 0
    },
    {
      slug: "self-hosted-cloud-server",
      title: "Self-Hosted Cloud Server",
      description:
        "A secure, containerized self-hosted cloud platform built with Nextcloud, MariaDB, Redis, Pi-hole, Nginx Proxy Manager, and Twingate — providing private file storage, sync, HTTPS access, local DNS, and zero-trust remote connectivity.",
      stack: ["Docker", "Nextcloud", "Pi-hole", "Twingate"],
      href: "https://github.com/sakawatkabir13/Self-Hosted-Cloud-Server",
      category: "Infrastructure",
      featured: true,
      problem: "Personal services needed private storage, local DNS, HTTPS, and secure remote access without relying on a single SaaS vendor.",
      build:
        "Containerized Nextcloud, MariaDB, Redis, Pi-hole, and Nginx Proxy Manager, then exposed them through Twingate zero-trust access.",
      evidence: "Private file sync, HTTPS access, local DNS, and remote connectivity on a self-hosted stack.",
      stars: 1
    },
    {
      slug: "full-custom-dns-spoofer-with-scapy",
      title: "Full Custom DNS Spoofer with Scapy",
      description:
        "An educational Python toolkit for custom DNS spoofing with Scapy: MAC manipulation, network scanning, ARP spoofing, packet sniffing, and targeted DNS response interception in authorized lab environments.",
      stack: ["Python", "Scapy", "ARP", "Kali Linux"],
      href: "https://github.com/sakawatkabir13/full-custom-dns-spoofer-with-scapy",
      category: "Security Lab",
      featured: true,
      problem: "Understanding DNS interception requires seeing the complete packet path rather than treating spoofing as a black box.",
      build:
        "Built an authorized-lab toolkit covering MAC manipulation, discovery, ARP spoofing, packet sniffing, and targeted DNS responses.",
      evidence: "End-to-end Scapy workflow for isolated DNS-spoofing labs.",
      stars: 1
    },
    {
      slug: "hermes-cloud-agent-lab",
      title: "Hermes Cloud Agent Lab",
      description:
        "A reproducible personal AI agent stack on a low-cost AWS EC2 VPS, with a Telegram gateway, Hermes Agent, Ollama, and model routing across local Gemma GGUF and cloud LLMs.",
      stack: ["Shell", "AWS EC2", "Ollama", "Telegram"],
      href: "https://github.com/sakawatkabir13/hermes-cloud-agent-lab",
      category: "Cloud",
      stars: 1
    },
    {
      slug: "basilisk-shell",
      title: "Basilisk Shell",
      description:
        "An AI-powered Linux terminal assistant that converts natural-language requests into audited Bash commands with layered safety checks, risk-gated execution, multilingual understanding, and command history logging.",
      stack: ["Python", "Bash", "NLP", "Linux"],
      href: "https://github.com/sakawatkabir13/basilisk-shell",
      category: "Automation",
      featured: true,
      problem: "Natural-language shell assistants can turn ambiguous requests into unsafe commands.",
      build:
        "Added audited command generation, layered safety checks, risk-gated execution, multilingual input, and command-history logging.",
      evidence: "Commands remain reviewable before execution instead of being run blindly.",
      stars: 2
    },
    {
      slug: "agrilink",
      title: "AgriLink",
      description:
        "A full-stack marketplace for farmers, buyers, and admins. Supabase + RLS, Stripe payments, role-based dashboards, AI chatbot. React, TypeScript, Vite.",
      stack: ["React", "TypeScript", "Supabase", "Stripe"],
      href: "https://github.com/sakawatkabir13/AgriLink",
      category: "Web App",
      stars: 0
    },
    {
      slug: "whatsapp-auto-message-sender",
      title: "WhatsApp Auto Message Sender",
      description:
        "Schedule and send WhatsApp messages to contacts and groups via WhatsApp Web. Python CLI + library powered by PyWhatKit for instant or timed delivery.",
      stack: ["Python", "PyWhatKit", "Automation"],
      href: "https://github.com/sakawatkabir13/whatsapp-auto-message-sender",
      category: "Bot",
      stars: 0
    },
    {
      slug: "pdf-merger",
      title: "PDF Merger",
      description:
        "A modern, lightweight web app to merge multiple PDF files into a single document — fast, secure, and effortless.",
      stack: ["Python", "Flask", "PyPDF2"],
      href: "https://github.com/sakawatkabir13/pdf-merger",
      category: "Web App",
      stars: 0
    },
    {
      slug: "cuet-insights",
      title: "CUET Insights",
      description:
        "A Spring Boot + MySQL platform for CUET students, faculty & alumni — complaint tracking, innovation showcase, resource sharing, JWT-secured auth.",
      stack: ["Java", "Spring Boot", "MySQL", "JWT"],
      href: "https://github.com/sakawatkabir13/cuet-insights",
      category: "Full-Stack",
      featured: true,
      problem: "CUET community workflows for complaints, ideas, and shared resources were scattered across disconnected channels.",
      build:
        "Built a Spring Boot and MySQL platform with JWT-secured access, complaint tracking, innovation showcases, and resource sharing.",
      evidence: "One role-aware platform for students, faculty, and alumni.",
      stars: 0
    },
    {
      slug: "cuet-jam",
      title: "CUET Jam",
      description:
        "A community platform for CUET students, faculty, and alumni — share resources, find collaborators, and stay connected.",
      stack: ["Java", "Spring Boot", "MySQL", "JWT"],
      href: "https://github.com/sakawatkabir13/cuet-jam",
      category: "Full-Stack",
      stars: 0
    },
    {
      slug: "discord-music-bot",
      title: "DiscordBots",
      description:
        "A Discord bot project built to explore automation, APIs, event-driven programming, and the habit of building things just to see how they work.",
      stack: ["Python", "Discord API"],
      href: "https://github.com/sakawatkabir13/DiscordBots",
      category: "Bot",
      stars: 0
    }
  ] satisfies Project[]
} as const;
