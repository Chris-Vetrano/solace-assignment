import React from "react";

const colorSets = [
  { background: "#f0f5ff", text: "#1e3a8a" }, // Muted blue
  { background: "#f5f3ff", text: "#3b0764" }, // Muted purple
  { background: "#f0fdf4", text: "#14532d" }, // Muted green
  { background: "#fff1f2", text: "#881337" }, // Muted rose
  { background: "#fdf4ff", text: "#701a75" }, // Muted pink
  { background: "#f8fafc", text: "#334155" }, // Slate
];

function stringToColorSet(str: string): { background: string; text: string } {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colorSets.length;
  return colorSets[index];
}

interface PillProps {
  label: string;
  className?: string;
}

export function ColoredPill({ label, className = "" }: PillProps) {
  const colors = stringToColorSet(label);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        transition: "all 150ms ease-in-out",
      }}
    >
      {label}
    </span>
  );
}
