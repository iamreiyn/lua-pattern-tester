/**
 * Match highlight colors, cycled per group/match index.
 */
export const MATCH_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ec4899",
  "#06b6d4",
];

/**
 * Quick reference items shown in the results sidebar.
 */
export const QUICK_REFERENCE = [
  { token: "%a", desc: "any letter" },
  { token: "%d", desc: "any digit" },
  { token: "%w", desc: "letter or digit" },
  { token: "%s", desc: "whitespace" },
  { token: "%p", desc: "punctuation" },
  { token: "%l", desc: "lowercase letter" },
  { token: "%u", desc: "uppercase letter" },
  { token: "[^...]", desc: "negated set" },
  { token: "()", desc: "position capture" },
  { token: "$", desc: "end of string" },
  { token: "^", desc: "start of string" },
  { token: ".", desc: "any character" },
];
