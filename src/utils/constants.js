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

/**
 * Common Lua pattern examples, specifically useful for Game Dev (Roblox/etc)
 */
export const PATTERN_EXAMPLES = [
  { name: "Level Extractor", pattern: "Level%s*(%d+)", desc: "Finds numbers in 'Level 10' or 'Level 2'" },
  { name: "Hex Colors", pattern: "#?([%x][%x][%x][%x][%x][%x])", desc: "Matches 6-digit hex color codes" },
  { name: "CSV Splitter", pattern: "[^,%s]+", desc: "Finds items in a comma-separated list" },
  { name: "File Extractor", pattern: "([^/]+)%.lua$", desc: "Gets the .lua filename from a path" },
];
