import * as fengariModule from "fengari-web";

const fengari = fengariModule.default
  ? fengariModule.default
  : Object.assign({}, fengariModule);

// Lua code templates for each mode
const LUA_TEMPLATES = {
  match: `
    return function(inputString, inputPattern)
      local start_idx, end_idx = string.find(inputString, inputPattern)
      if not start_idx then return "NO_MATCH" end
      local captures = { string.match(inputString, inputPattern) }
      local parts = { "MATCH", tostring(start_idx), tostring(end_idx) }
      for _, v in ipairs(captures) do
        if type(v) == "number" then
          table.insert(parts, "POS:" .. tostring(v))
        else
          table.insert(parts, "STR:" .. tostring(v))
        end
      end
      return table.concat(parts, "\\t")
    end`,

  gmatch: `
    return function(inputString, inputPattern)
      local all_matches = {}
      local search_start = 1
      while search_start <= #inputString do
        local start_idx, end_idx = string.find(inputString, inputPattern, search_start)
        if not start_idx then break end
        local captures = { string.match(inputString, inputPattern, search_start) }
        local parts = { "MATCH", tostring(start_idx), tostring(end_idx) }
        for _, v in ipairs(captures) do
          if type(v) == "number" then
            table.insert(parts, "POS:" .. tostring(v))
          else
            table.insert(parts, "STR:" .. tostring(v))
          end
        end
        table.insert(all_matches, table.concat(parts, "\\t"))
        if end_idx >= search_start then
          search_start = end_idx + 1
        else
          search_start = search_start + 1
        end
      end
      if #all_matches == 0 then return "NO_MATCH" end
      return table.concat(all_matches, "\\n")
    end`,

  find: `
    return function(inputString, inputPattern)
      local start_idx, end_idx = string.find(inputString, inputPattern)
      if not start_idx then return "NO_MATCH" end
      local all_results = { select(3, string.find(inputString, inputPattern)) }
      local parts = { "MATCH", tostring(start_idx), tostring(end_idx) }
      for _, v in ipairs(all_results) do
        if type(v) == "number" then
          table.insert(parts, "POS:" .. tostring(v))
        else
          table.insert(parts, "STR:" .. tostring(v))
        end
      end
      return table.concat(parts, "\\t")
    end`,

  gsub: `
    return function(inputString, inputPattern, replStr)
      local all_matches = {}
      local search_start = 1
      while search_start <= #inputString do
        local start_idx, end_idx = string.find(inputString, inputPattern, search_start)
        if not start_idx then break end
        local captures = { string.match(inputString, inputPattern, search_start) }
        local parts = { "MATCH", tostring(start_idx), tostring(end_idx) }
        for _, v in ipairs(captures) do
          if type(v) == "number" then
            table.insert(parts, "POS:" .. tostring(v))
          else
            table.insert(parts, "STR:" .. tostring(v))
          end
        end
        table.insert(all_matches, table.concat(parts, "\\t"))
        if end_idx >= search_start then
          search_start = end_idx + 1
        else
          search_start = search_start + 1
        end
      end
      local gsub_result = string.gsub(inputString, inputPattern, replStr or "")
      if #all_matches == 0 then return "NO_MATCH" end
      return table.concat(all_matches, "\\n") .. "\\nGSUB_RESULT\\t" .. gsub_result
    end`,
};

// Helpers to parse the results from Lua

function parseRawResult(rawResult, text) {
  const lines = rawResult.split("\n");
  const matches = [];
  let gsubOutput = "";

  for (const line of lines) {
    if (line.startsWith("GSUB_RESULT\t")) {
      gsubOutput = line.substring(12);
      continue;
    }

    const parts = line.split("\t");
    if (parts[0] !== "MATCH") continue;

    const startIdx = parseInt(parts[1], 10);
    const endIdx = parseInt(parts[2], 10);
    const captures = [];

    for (let i = 3; i < parts.length; i++) {
      if (parts[i].startsWith("POS:")) {
        captures.push({ type: "pos", value: parseInt(parts[i].substring(4), 10) });
      } else if (parts[i].startsWith("STR:")) {
        captures.push({ type: "str", value: parts[i].substring(4) });
      }
    }

    const fullMatch = text.substring(startIdx - 1, endIdx);
    matches.push({ startIdx, endIdx, fullMatch, captures });
  }

  return { matches, gsubOutput };
}

// Main function to run the pattern test
export function executeLuaPattern(text, pattern, mode, replacement = "") {
  if (!text || !pattern) {
    return { matches: [], gsubOutput: "", error: "" };
  }

  try {
    const luaCode = LUA_TEMPLATES[mode];
    if (!luaCode) {
      return { matches: [], gsubOutput: "", error: `Unknown mode: ${mode}` };
    }

    const func = fengari.load(luaCode)();
    const rawResult = mode === "gsub"
      ? func.call(text, pattern, replacement)
      : func.call(text, pattern);

    if (rawResult === "NO_MATCH") {
      return { matches: [], gsubOutput: "", error: "" };
    }

    const { matches, gsubOutput } = parseRawResult(rawResult, text);
    return { matches, gsubOutput, error: "" };
  } catch (err) {
    console.error("Lua execution error:", err);
    return { matches: [], gsubOutput: "", error: err.message || "Invalid pattern" };
  }
}
