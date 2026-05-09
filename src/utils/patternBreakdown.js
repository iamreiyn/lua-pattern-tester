// Simple parser to explain what the Lua pattern tokens do

function describeQuantifier(q) {
  if (q === "+") return " (1 or more)";
  if (q === "*") return " (0 or more)";
  if (q === "?") return " (optional)";
  if (q === "-") return " (0 or more, shortest)";
  return "";
}

const ESCAPE_MAP = {
  "%a": "any letter", "%A": "non-letter",
  "%d": "any digit", "%D": "non-digit",
  "%w": "letter or digit", "%W": "non-alphanumeric",
  "%s": "whitespace", "%S": "non-whitespace",
  "%p": "punctuation", "%P": "non-punctuation",
  "%l": "lowercase", "%L": "non-lowercase",
  "%u": "uppercase", "%U": "non-uppercase",
  "%c": "control char", "%C": "non-control",
};

function describeEscape(esc, q) {
  const base = ESCAPE_MAP[esc] || `literal '${esc[1]}'`;
  return base + describeQuantifier(q);
}

function describeClass(cls, q) {
  const negated = cls[1] === "^";
  const label = negated ? "negated set" : "character set";
  return `${label} ${cls}` + describeQuantifier(q);
}

function describeCapture(inner) {
  const content = inner.substring(1, inner.length - 1);
  if (!content) return "position capture";
  return `capture group: ${content}`;
}


const QUANTIFIERS = "*+?-";

function tryQuantifier(pat, pos) {
  if (pos < pat.length && QUANTIFIERS.includes(pat[pos])) {
    return pat[pos];
  }
  return "";
}


export function breakdownPattern(pat) {
  if (!pat) return [];

  const tokens = [];
  let i = 0;

  while (i < pat.length) {
    // Empty capture ()
    if (pat[i] === "(" && pat[i + 1] === ")") {
      tokens.push({ raw: "()", desc: "position capture" });
      i += 2;
      continue;
    }

    // Capture group (...)
    if (pat[i] === "(") {
      let depth = 1;
      let j = i + 1;
      while (j < pat.length && depth > 0) {
        if (pat[j] === "(" && pat[j - 1] !== "%") depth++;
        if (pat[j] === ")" && pat[j - 1] !== "%") depth--;
        j++;
      }
      const inner = pat.substring(i, j);
      tokens.push({ raw: inner, desc: describeCapture(inner) });
      i = j;
      continue;
    }

    // Character class [...]
    if (pat[i] === "[") {
      let j = i + 1;
      if (j < pat.length && pat[j] === "^") j++;
      if (j < pat.length && pat[j] === "]") j++;
      while (j < pat.length && pat[j] !== "]") j++;
      j++;
      const cls = pat.substring(i, j);
      const q = tryQuantifier(pat, j);
      if (q) j++;
      tokens.push({ raw: cls + q, desc: describeClass(cls, q) });
      i = j;
      continue;
    }

    // Escape sequence %x
    if (pat[i] === "%" && i + 1 < pat.length) {
      const esc = pat.substring(i, i + 2);
      const q = tryQuantifier(pat, i + 2);
      tokens.push({ raw: esc + q, desc: describeEscape(esc, q) });
      i += 2 + (q ? 1 : 0);
      continue;
    }

    // Anchors
    if (pat[i] === "^" && i === 0) {
      tokens.push({ raw: "^", desc: "start of string" });
      i++;
      continue;
    }
    if (pat[i] === "$" && i === pat.length - 1) {
      tokens.push({ raw: "$", desc: "end of string" });
      i++;
      continue;
    }

    // Backslash escape sequence like \n, \32, \x20, etc etc
    if (pat[i] === "\\") {
      let j = i + 1;
      let desc = "literal '\\'";

      if (j < pat.length) {
        const nextChar = pat[j];
        if (nextChar === "n") { desc = "newline"; j++; }
        else if (nextChar === "t") { desc = "tab"; j++; }
        else if (nextChar === "r") { desc = "carriage return"; j++; }
        else if (nextChar === '"') { desc = "literal '\"'"; j++; }
        else if (nextChar === "'") { desc = "literal '\\''"; j++; }
        else if (nextChar === "\\") { desc = "literal '\\'"; j++; }
        else if (nextChar === "x" && j + 2 < pat.length && /^[0-9a-fA-F]{2}$/.test(pat.substring(j + 1, j + 3))) {
          desc = `hex char ${pat.substring(j + 1, j + 3)}`;
          j += 3;
        }
        else if (/^[0-9]$/.test(nextChar)) {
          let numStr = nextChar;
          j++;
          while (j < pat.length && /^[0-9]$/.test(pat[j]) && numStr.length < 3) {
            if (numStr.length === 2 && parseInt(numStr + pat[j], 10) > 255) break;
            numStr += pat[j];
            j++;
          }
          desc = `char code ${numStr}`;
        }
        else {
          desc = `literal '${nextChar}'`;
          j++;
        }
      }

      const q = tryQuantifier(pat, j);
      const raw = pat.substring(i, j) + q;
      tokens.push({ raw, desc: desc + describeQuantifier(q) });
      i = j + (q ? 1 : 0);
      continue;
    }

    // Dot (any character)
    if (pat[i] === ".") {
      const q = tryQuantifier(pat, i + 1);
      tokens.push({ raw: "." + q, desc: "any character" + describeQuantifier(q) });
      i += 1 + (q ? 1 : 0);
      continue;
    }

    // Literal character
    const ch = pat[i];
    const q = tryQuantifier(pat, i + 1);
    tokens.push({ raw: ch + q, desc: `literal '${ch}'` + describeQuantifier(q) });
    i += 1 + (q ? 1 : 0);
  }

  return tokens;
}
