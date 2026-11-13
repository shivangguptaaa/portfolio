"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";

interface TocItem {
  id: string;
  label: string;
}

interface BuildNotesTocProps {
  hasWhatsNext?: boolean;
}

const BASE_ITEMS: TocItem[] = [
  { id: "cs-why", label: "Why it exists" },
  { id: "cs-what", label: "What it does" },
  { id: "cs-limits", label: "What it won’t do" },
  { id: "cs-how", label: "How it works" },
  { id: "cs-measured", label: "By the numbers" },
];

export function BuildNotesToc({ hasWhatsNext = true }: BuildNotesTocProps) {
  const items = useMemo(() => {
    return hasWhatsNext
      ? [...BASE_ITEMS, { id: "cs-next", label: "What’s next" }]
      : BASE_ITEMS;
  }, [hasWhatsNext]);

  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [activeId, setActiveId] = useState<string>("cs-why");

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const scrollY = window.scrollY;
      const navOffset = 104; // 64px header + 40px buffer
      const triggerY = scrollY + navOffset;

      const newProgress: Record<string, number> = {};
      let currentActive = items[0]?.id || "cs-why";

      const isBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 40;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const el = document.getElementById(item.id);
        if (!el) {
          newProgress[item.id] = 0;
          continue;
        }

        const top = el.offsetTop;
        const height = el.offsetHeight;
        const bottom = top + height;

        if (isBottom) {
          newProgress[item.id] = 100;
          currentActive = items[items.length - 1].id;
        } else if (triggerY < top) {
          newProgress[item.id] = 0;
        } else if (triggerY >= bottom) {
          newProgress[item.id] = 100;
        } else {
          const pct = Math.min(100, Math.max(0, ((triggerY - top) / height) * 100));
          newProgress[item.id] = Math.round(pct);
          currentActive = item.id;
        }
      }

      setProgressMap(newProgress);
      setActiveId(currentActive);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        const navOffset = 104;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        setActiveId(id);
      }
    },
    []
  );

  return (
    <nav className="toc" aria-label="On this page">
      <p className="label">On this page</p>
      {items.map((item) => {
        const isActive = activeId === item.id;
        const progress = progressMap[item.id] ?? 0;

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => scrollToSection(e, item.id)}
            aria-current={isActive ? "true" : undefined}
          >
            <span>{item.label}</span>
            <span className="bar">
              <i style={{ width: `${progress}%` }} />
            </span>
          </a>
        );
      })}
    </nav>
  );
}
