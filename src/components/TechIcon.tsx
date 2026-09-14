import type { JSX } from "react";

// 12 tech logos as inline SVG, each with its real brand accent color.
// Inline SVG keeps icons sharp at any card size and needs no asset pipeline.

export interface TechIconDef {
  name: string;
  color: string;
  glyph: JSX.Element;
}

const vb = "0 0 24 24";

export const TECH_ICONS: TechIconDef[] = [
  {
    name: "React",
    color: "#61DAFB",
    glyph: (
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </g>
    ),
  },
  {
    name: "Vue",
    color: "#42B883",
    glyph: (
      <g fill="currentColor">
        <path d="M2 3h4.4L12 12.6 17.6 3H22L12 21 2 3Z" />
        <path d="M6.4 3h4.2L12 5.4 13.4 3h4.2L12 12.6 6.4 3Z" fill="#35495E" />
      </g>
    ),
  },
  {
    name: "Angular",
    color: "#DD0031",
    glyph: (
      <g fill="currentColor">
        <path d="M12 2 3 5.2l1.4 12L12 22l7.6-4.8L21 5.2 12 2Z" opacity="0.9" />
        <path d="M12 4.2 17 17h-2l-1.2-2.8h-3.6L9 17H7l5-12.8Zm0 3.2-1.3 3.6h2.6L12 7.4Z" fill="#fff" stroke="none" />
      </g>
    ),
  },
  {
    name: "Figma",
    color: "#F24E1E",
    glyph: (
      <g>
        <path d="M8 2h4v7H8a3.5 3.5 0 0 1 0-7Z" fill="#F24E1E" />
        <path d="M12 2h4a3.5 3.5 0 0 1 0 7h-4V2Z" fill="#FF7262" />
        <path d="M8 9h4v7H8a3.5 3.5 0 0 1 0-7Z" fill="#A259FF" />
        <circle cx="15.5" cy="12.5" r="3.5" fill="#1ABCFE" />
        <path d="M8 16h4v3.5A3.5 3.5 0 1 1 8 16Z" fill="#0ACF83" />
      </g>
    ),
  },
  {
    name: "Tailwind",
    color: "#38BDF8",
    glyph: (
      <path
        fill="currentColor"
        d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.4.9 1 2 2 4.6 2 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.4-.9-1-2-2-4.6-2ZM7 12c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.4.9 1 2 2 4.6 2 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.4-.9-1-2-2-4.6-2Z"
      />
    ),
  },
  {
    name: "Next.js",
    color: "#E5E7EB",
    glyph: (
      <g>
        <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
        <path fill="currentColor" d="M9 7h1.8l5.4 8.6V7H18v10h-1.8L10.8 8.4V17H9V7Z" />
      </g>
    ),
  },
  {
    name: "JavaScript",
    color: "#F7DF1E",
    glyph: (
      <g>
        <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" opacity="0.2" />
        <path
          fill="currentColor"
          d="M9.4 17.6c.5.8 1 1.4 2.2 1.4 1 0 1.6-.5 1.6-1.2 0-.8-.6-1.1-1.7-1.6l-.6-.3c-1.7-.7-2.8-1.6-2.8-3.5 0-1.7 1.3-3 3.4-3 1.5 0 2.5.5 3.3 1.9l-1.8 1.1c-.4-.7-.8-1-1.5-1-.7 0-1.1.4-1.1 1 0 .7.4 1 1.5 1.4l.6.3c2 .9 3.1 1.7 3.1 3.6 0 2-1.6 3.2-3.7 3.2-2 0-3.4-1-4-2.4l1.5-.9Zm7.3.3c.3.6.7 1 1.5 1 .6 0 1-.3 1-.8 0-.5-.4-.7-1.3-1l-.5-.2c-1.5-.6-2.5-1.4-2.5-3 0-1.5 1.1-2.6 2.9-2.6 1.2 0 2.1.4 2.8 1.6l-1.6 1c-.3-.6-.7-.8-1.2-.8s-.9.3-.9.8c0 .6.3.8 1.2 1.1l.5.2c1.8.8 2.8 1.5 2.8 3.1 0 1.8-1.4 2.8-3.2 2.8-1.8 0-3-.9-3.5-2l1.9-1.2Z"
        />
      </g>
    ),
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    glyph: (
      <g>
        <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" opacity="0.2" />
        <path
          fill="currentColor"
          d="M13.8 15.4v1.3c.3.2.8.3 1.4.3.8 0 1.2-.3 1.2-.9 0-.5-.3-.8-1.2-1.1-1.2-.4-2-1-2-2.2 0-1.3 1-2.2 2.5-2.2.7 0 1.4.2 1.8.4v1.3c-.3-.2-.8-.4-1.3-.4-.8 0-1.1.3-1.1.8 0 .5.3.7 1.2 1 1.3.4 2 1 2 2.3 0 1.4-1 2.3-2.7 2.3-.8 0-1.5-.2-1.8-.4v-2.5Zm-5.6-3.4H6.5v-1.4h6.3V12h-1.7v6.3H9.8V12H8.2Z"
        />
      </g>
    ),
  },
  {
    name: "Node.js",
    color: "#5FA04E",
    glyph: (
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 2.5 20 7v10l-8 4.5L4 17V7l8-4.5Z" />
        <path d="M12 12 20 7M12 12v9.5M12 12 4 7" />
      </g>
    ),
  },
  {
    name: "Git",
    color: "#F05033",
    glyph: (
      <g fill="currentColor">
        <path d="M21.6 11.2 12.8 2.4a1.4 1.4 0 0 0-2 0L9.2 4l2.3 2.3a1.7 1.7 0 0 1 2.1 2.2l2.2 2.2a1.7 1.7 0 1 1-1 1l-2-2v5.4a1.7 1.7 0 1 1-1.4 0V9.6a1.7 1.7 0 0 1-.9-2.2L8.2 5 2.4 10.8a1.4 1.4 0 0 0 0 2l8.8 8.8a1.4 1.4 0 0 0 2 0l8.4-8.4a1.4 1.4 0 0 0 0-2Z" />
      </g>
    ),
  },
  {
    name: "Docker",
    color: "#1D63ED",
    glyph: (
      <g fill="currentColor">
        <rect x="4" y="10" width="3" height="3" rx="0.4" />
        <rect x="8" y="10" width="3" height="3" rx="0.4" />
        <rect x="12" y="10" width="3" height="3" rx="0.4" />
        <rect x="8" y="6" width="3" height="3" rx="0.4" />
        <rect x="12" y="6" width="3" height="3" rx="0.4" />
        <path d="M21 11.5c-.8-.6-2-.8-2.6-.5-.2-1-.8-1.9-1.8-2.4l-.4-.2-.2.4c-.4.8-.5 1.7-.1 2.5-.1.2-.4.3-.9.3H3c0 1 .3 2.1 1 3 .9 1.2 2.5 1.9 4.6 1.9 4.4 0 7.4-2 8.9-5.6.6 0 1.9 0 2.5-1l.5-.5-.5-.1c.1 0 .5.5.5.5Z" opacity="0.9" />
      </g>
    ),
  },
  {
    name: "Python",
    color: "#FFD43B",
    glyph: (
      <g fill="currentColor">
        <path d="M12 2c-2.6 0-4.5.8-4.5 2.6V7h4.7v.8H5.4C3.6 7.8 2 9.3 2 12s1.6 4.2 3.4 4.2h2v-3.4c0-1.7 1.4-3 3.1-3h4.4c1.3 0 2.4-1.1 2.4-2.4V4.6C17.3 2.8 14.6 2 12 2Zm-2.3 2.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z" />
        <path d="M12 22c2.6 0 4.5-.8 4.5-2.6V17h-4.7v-.8h6.8c1.8 0 3.4-1.5 3.4-4.2s-1.6-4.2-3.4-4.2h-2v3.4c0 1.7-1.4 3-3.1 3H9.1a2.4 2.4 0 0 0-2.4 2.4v2.8C6.7 21.2 9.4 22 12 22Zm2.3-2.2a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" />
      </g>
    ),
  },
];

export function TechIcon({ index, className }: { index: number; className?: string }) {
  const icon = TECH_ICONS[index % TECH_ICONS.length];
  return (
    <svg viewBox={vb} className={className} style={{ color: icon.color }} aria-label={icon.name} role="img">
      {icon.glyph}
    </svg>
  );
}
