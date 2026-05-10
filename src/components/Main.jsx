import { useState, useRef, useCallback, useEffect } from "react";
import { MATCH_COLORS, QUICK_REFERENCE, PATTERN_EXAMPLES } from "../utils/constants";
import { breakdownPattern } from "../utils/patternBreakdown";
import { executeLuaPattern } from "../utils/luaEngine";

function Main({ pattern, setPattern, inputText, setInputText }) {
  const [mode, setMode] = useState("gmatch");
  const [gsubRepl, setGsubRepl] = useState("");
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");
  const [gsubResult, setGsubResult] = useState("");
  const [collapsed, setCollapsed] = useState({});
  const editorRef = useRef(null);
  const highlightRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const patternInputRef = useRef(null);
  const patternHighlightRef = useRef(null);

  const formatWhitespace = (text) => {
    if (!text) return text;
    return text.split(" ").map((part, i, arr) => (
      <span key={i}>
        {part}
        {i < arr.length - 1 && (
          <>
            {" "}
            <span className="whitespace-dot">●</span>
          </>
        )}
      </span>
    ));
  };

  const onPatternScroll = () => {
    if (patternInputRef.current && patternHighlightRef.current) {
      patternHighlightRef.current.scrollLeft = patternInputRef.current.scrollLeft;
    }
  };

  // Sync pattern scroll when state changes
  useEffect(() => {
    onPatternScroll();
  }, [pattern]);

  // Focus pattern input on mount
  useEffect(() => {
    if (patternInputRef.current) {
      patternInputRef.current.focus();
    }
  }, []);

  // update matches whenever inputs change
  useEffect(() => {
    const { matches: newMatches, gsubOutput, error: newError } = executeLuaPattern(
      inputText,
      pattern,
      mode,
      gsubRepl
    );
    setMatches(newMatches);
    setGsubResult(gsubOutput);
    setError(newError);
  }, [inputText, pattern, mode, gsubRepl]);



  const lines = inputText.split("\n");
  const lineCount = Math.max(lines.length, 10);

  const getHighlightedLines = () => {
    const highlighted = new Set();
    for (const m of matches) {
      // Convert 1-indexed char positions to line numbers
      let charCount = 0;
      for (let i = 0; i < lines.length; i++) {
        const lineStart = charCount + 1;
        const lineEnd = charCount + lines[i].length;
        if (m.startIdx <= lineEnd + 1 && m.endIdx >= lineStart) {
          highlighted.add(i);
        }
        charCount += lines[i].length + 1; // +1 for \n
      }
    }
    return highlighted;
  };

  const highlightedLines = getHighlightedLines();

  // create the highlight overlay
  const buildHighlightOverlay = () => {
    if (matches.length === 0) return formatWhitespace(inputText);

    // Sort matches by start index
    const sorted = [...matches].sort((a, b) => a.startIdx - b.startIdx);
    const elements = [];
    let lastEnd = 0;

    sorted.forEach((match, matchIndex) => {
      const start = match.startIdx - 1; // Convert to 0-indexed
      const end = match.endIdx;
      const colorClass = `hl-match-${matchIndex % MATCH_COLORS.length}`;

      // Text before this match
      if (start > lastEnd) {
        elements.push(<span key={`text-${matchIndex}`}>{formatWhitespace(inputText.substring(lastEnd, start))}</span>);
      }

      // The matched text with highlight
      elements.push(
        <mark key={matchIndex} className={`hl-match ${colorClass}`}>
          {formatWhitespace(inputText.substring(start, end))}
        </mark>
      );

      lastEnd = end;
    });

    // Remaining text
    if (lastEnd < inputText.length) {
      elements.push(<span key="last-text">{formatWhitespace(inputText.substring(lastEnd))}</span>);
    }

    return elements;
  };

  // ui state helpers
  const toggleCollapse = (index) => {
    setCollapsed((prev) => ({ ...prev, [index]: !prev[index] }));
  };


  const copyMatch = (text) => {
    navigator.clipboard.writeText(text).catch(() => { });
  };

  const patternTokens = breakdownPattern(pattern);

  return (
    <main className="main-content">
      {/* Pattern Input Bar */}
      <div className="pattern-bar">
        <div className="pattern-input-wrapper">
          <div className="pattern-highlights" ref={patternHighlightRef}>
            {formatWhitespace(pattern)}
          </div>
          <input
            ref={patternInputRef}
            type="text"
            className="pattern-input"
            placeholder="Enter your Lua pattern here"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            onScroll={onPatternScroll}
            id="pattern-input"
            spellCheck={false}
          />
        </div>
        <div className="mode-tabs">
          {["match", "gmatch", "find", "gsub"].map((m) => (
            <button
              key={m}
              className={`mode-tab ${mode === m ? "active" : ""}`}
              onClick={() => setMode(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* gsub replacement input */}
      {mode === "gsub" && (
        <div className="gsub-section">
          <div className="gsub-label">Replacement String</div>
          <input
            type="text"
            className="gsub-input"
            placeholder='e.g. %1-%2 or "replaced"'
            value={gsubRepl}
            onChange={(e) => setGsubRepl(e.target.value)}
            spellCheck={false}
          />
        </div>
      )}

      {/* Workspace */}
      <div className="workspace">
        {/* Editor Panel */}
        <div className="editor-panel">
          {/* Editor Header with stats */}
          <div className="editor-header">
            <span className="editor-header-label"><i className="fa-solid fa-file-lines"></i> TEST STRING</span>
            <span className="editor-header-stats">
              {lines.length} {lines.length === 1 ? "line" : "lines"}
              {matches.length > 0 && (
                <> · {matches.length} {matches.length === 1 ? "match" : "matches"}</>
              )}
            </span>
          </div>

          <div className="editor-container">
            <div className="line-numbers" ref={lineNumbersRef}>
              {Array.from({ length: lineCount }, (_, i) => (
                <div
                  key={i}
                  className={`line-number ${highlightedLines.has(i) ? "highlighted" : ""}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="editor-content">
              <div className="editor-highlights" ref={highlightRef}>
                {buildHighlightOverlay()}
              </div>
              <textarea
                ref={editorRef}
                className="editor-textarea"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your test string here..."
                spellCheck={false}
              />
              <div className="editor-width-pusher">{inputText}</div>
            </div>
          </div>

          {/* Pattern Breakdown */}
          {patternTokens.length > 0 && (
            <div className="pattern-breakdown">
              <div className="breakdown-label"><i className="fa-solid fa-circle-info"></i> PATTERN BREAKDOWN</div>
              <div className="breakdown-tokens">
                {patternTokens.map((tok, i) => (
                  <div key={i} className="breakdown-token">
                    <span className="breakdown-token-raw">{tok.raw}</span>
                    <span className="breakdown-token-desc">{tok.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Panel */}
        <div className="results-panel">
          <div className="results-header">
            <span><i className="fa-solid fa-circle-check"></i> Results</span>
            {matches.length > 0 ? (
              <span className="results-count-badge">
                {matches.length} found
              </span>
            ) : (
              <span className="results-count">(0 found)</span>
            )}
          </div>

          {error && (
            <div className="error-banner">
              <span className="error-icon">⚠</span>
              <span>{error}</span>
            </div>
          )}

          <div className="results-body">
            {matches.length === 0 && !error && (
              <div className="empty-state">
                <div className="empty-state-icon"><i className="fa fa-search"></i></div>
                <div className="empty-state-title">No matches yet</div>
                <div className="empty-state-text">
                  Enter a pattern and some text to see results
                </div>
              </div>
            )}

            {matches.map((match, index) => {
              const isOpen = !collapsed[index];
              const color = MATCH_COLORS[index % MATCH_COLORS.length];

              return (
                <div
                  key={index}
                  className="match-card"
                  style={{ borderLeftColor: color }}
                >
                  <div
                    className="match-card-header"
                    onClick={() => toggleCollapse(index)}
                  >
                    <div className="match-card-title">
                      <span
                        className={`match-card-toggle ${isOpen ? "open" : ""}`}
                      >
                        ▼
                      </span>
                      <span className="match-card-label">
                        Match {index + 1}
                      </span>
                      <span className="match-card-range">
                        pos {match.startIdx} → {match.endIdx}
                      </span>
                    </div>
                    <div className="match-card-actions">
                      <button
                        className="match-card-btn"
                        title="Copy full match"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyMatch(match.fullMatch);
                        }}
                      >
                        <i className="fa fa-copy"></i>
                      </button>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="match-card-body">
                      <div className="match-row">
                        <span className="match-row-label">FULL MATCH</span>
                        <span className="match-full-value">
                          {match.fullMatch}
                        </span>
                      </div>

                      {match.captures.map((cap, capIdx) => (
                        <div className="match-row" key={capIdx}>
                          <span className="match-row-label">
                            <span className="group-badge" style={{ background: MATCH_COLORS[capIdx % MATCH_COLORS.length] }}>
                              Group {capIdx + 1}
                            </span>
                            <span className={`capture-type-label ${cap.type}`}>
                              {cap.type === "pos" ? "Position" : "Content"}
                            </span>
                          </span>
                          <span className="match-row-value">
                            {cap.type === "pos" ? (
                              <span className="capture-type-pos">
                                <span className="pin">📍</span> {cap.value}
                              </span>
                            ) : (
                              cap.value
                            )}
                          </span>
                        </div>
                      ))}

                      {match.captures.length === 0 && (
                        <div className="match-row">
                          <span className="match-row-label" style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
                            No capture groups in pattern
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* gsub output */}
          {mode === "gsub" && gsubResult && (
            <div className="gsub-section">
              <div className="gsub-label">gsub Output</div>
              <div className="gsub-output">{gsubResult}</div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Main;