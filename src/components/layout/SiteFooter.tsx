import Link from "next/link";
import React from "react";
import {
  BookOpen,
  Code2,
  FileText,
  FolderGit2,
  Github,
  Linkedin,
  Mail,
  Rss,
  Sparkles
} from "lucide-react";
import { CtfBadge } from "@/components/ctf/CtfBadge";
import { portfolio } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-canvas/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-rose"
            >
              <Code2 className="h-4 w-4 text-mint" />
              <span className="text-mint">~/</span>
              {portfolio.handle}
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">
              Portfolio of {portfolio.name}, a security-focused backend and systems
              developer with hands-on DevOps and infrastructure experience. Showcasing
              projects, technical writing, and practical security work.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-ember">
              <Sparkles className="h-3.5 w-3.5" />
              {portfolio.liveStatus.line2}
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-400">
              Explore
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-zinc-300 transition hover:text-mint"
                >
                  <FolderGit2 className="h-3.5 w-3.5" />
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-zinc-300 transition hover:text-mint"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Writeups &amp; Notes
                </Link>
              </li>
              <li>
                <Link
                  href="/rss.xml"
                  className="inline-flex items-center gap-2 text-zinc-300 transition hover:text-mint"
                >
                  <Rss className="h-3.5 w-3.5" />
                  RSS feed
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-400">
              Connect
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={portfolio.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-zinc-300 transition hover:text-mint"
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={portfolio.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-zinc-300 transition hover:text-mint"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={portfolio.links.email}
                  className="inline-flex items-center gap-2 text-zinc-300 transition hover:text-mint"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </a>
              </li>
              <li>
                <a
                  href={portfolio.links.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-zinc-300 transition hover:text-mint"
                >
                  <FileText className="h-3.5 w-3.5" />
                  Résumé
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-zinc-400">
            © {new Date().getFullYear()} {portfolio.name}. Crafted with Next.js &amp;
            Tailwind.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <CtfBadge />
          </div>
        </div>
      </div>
    </footer>
  );
}
