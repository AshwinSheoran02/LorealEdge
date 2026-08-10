"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "The Science", href: "/science" },
  { label: "The Range", href: "/range" },
  { label: "Investigates", href: "/journal" },
] as const;

export interface NavProps {
  variant?: "site" | "app";
}

export function Nav({ variant = "site" }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* ── App variant: wordmark + close ── */
  if (variant === "app") {
    return (
      <header className="sticky top-0 z-50 bg-forest-deep border-b border-hairline-dark">
        <div className="content-width flex items-center justify-between h-16">
          <Link href="/" className="font-display tracking-[0.3em] uppercase font-medium text-cream">
            ROOTED
          </Link>
          <Link href="/" aria-label="Close" className="text-cream p-2 hover:text-sage-pale transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </Link>
        </div>
      </header>
    );
  }

  /* ── Site variant ── */
  return (
    <>
      <header
        className={[
          "sticky top-0 z-50 transition-colors duration-300",
          scrolled ? "bg-forest-deep border-b border-hairline-dark" : "bg-transparent",
        ].join(" ")}
      >
        <div className="content-width flex items-center justify-between h-16">
          <Link href="/" className="font-display tracking-[0.3em] uppercase font-medium text-cream">
            ROOTED
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-caption text-cream/80 hover:text-cream transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/scalp-match"
              className="bg-sage text-cream rounded-full px-5 py-2 text-sm font-medium hover:bg-sage-light transition-colors"
            >
              Scalp Match
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            type="button"
            aria-label="Menu"
            className="md:hidden text-cream p-2"
            onClick={() => setOpen(true)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 6h16M3 11h16M3 16h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-forest-deep flex flex-col">
          <div className="content-width flex items-center justify-between h-16">
            <Link href="/" className="font-display tracking-[0.3em] uppercase font-medium text-cream">
              ROOTED
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              className="text-cream p-2"
              onClick={() => setOpen(false)}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l14 14M18 4L4 18" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center content-width gap-8">
            {LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-display-lg text-cream"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="content-width pb-10">
            <Link
              href="/scalp-match"
              className="block w-full text-center bg-sage text-cream rounded-full py-3.5 text-body font-medium hover:bg-sage-light transition-colors"
              onClick={() => setOpen(false)}
            >
              Scalp Match
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
