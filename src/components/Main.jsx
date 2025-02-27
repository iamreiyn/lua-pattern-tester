const { useState } = require("react");
const fengari = require("fengari-web");

function Main() {
  const [string, setString] = useState("");
  const [result, setResult] = useState("");
  const [pattern, setPattern] = useState("");

  const executeLuaFunction = (inputString, inputPattern) => {
    try {
      let func = fengari.load(`
        return function(inputString, inputPattern)
          local captures = { string.match(inputString, inputPattern) }
          if #captures == 0 then return "" end
          return table.concat(captures, "ˍ")
        end`)();
      
      fengari.lua_print = (...args) => console.log("Lua Output:", ...args);
      const luaResult = func.call(inputString, inputPattern);
      console.log("Processed Lua Result:", luaResult);
      return luaResult;
    } catch (error) {
      console.error("Lua execution error:", error);
      return "Error: Invalid pattern or input";
    }};

  const onChangeString = (event) => {
    const newString = event.target.value.trim();
    setString(newString);
    setResult(executeLuaFunction(newString, pattern));
  };

  const onChangePatterns = (event) => {
    const newPattern = event.target.value.trim();
    setPattern(newPattern);
    setResult(executeLuaFunction(string, newPattern));
  };

  const colors = ["#ff4c4c", "#4cff4c", "#4c4cff", "#ffcc00", "#ff66ff"];

  const highlightMatches = (text, matches) => {
    let lastIndex = 0;
    let coloredText = [];

    matches.forEach((word, index) => {
      const start = text.indexOf(word, lastIndex);
      if (start === -1) return;
      const end = start + word.length;
      coloredText.push(text.substring(lastIndex, start));
      coloredText.push(
        <span key={index} style={{ backgroundColor: colors[index % colors.length], padding: "2px 4px", borderRadius: "3px" }}>
          {word}
        </span>
      );
      lastIndex = end;
    });
    coloredText.push(text.substring(lastIndex));
    return coloredText;
  };

  return (
    <>
      <div className="center">
        <div style={{ width: "690px", marginTop: "5vh" }} className="input-group mb-3">
          <input
            onChange={onChangePatterns}
            style={{ backgroundColor: "#313537", borderColor: "#313537", color: "#d3d3d3" }}
            id="patterns"
            type="text"
            className="form-control"
            placeholder="Lua Patterns (e.g. %d+ to match numbers)"
            aria-label="Lua Patterns"
            aria-describedby="basic-addon2"/>
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2" style={{
              borderBottomLeftRadius: "0px",
              borderTopLeftRadius: "0px",
              backgroundColor: "#313537",
              borderColor: "#313537",
              color: result && result !== "Error: Invalid pattern or input" ? "green" : "red"
            }}>
              <strong>{result && result !== "Error: Invalid pattern or input" ? "Matches" : "No Matches"}</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="center">
        <div style={{ display: "flex", width: "700px" }}>
          <textarea
            onChange={onChangeString}
            style={{ resize: "none", width: "50%", borderColor: "#313537", backgroundColor: "#313537", color: "#d3d3d3" }}
            placeholder="Enter your text here"
            className="form-control"
            rows="8"/>
          <div className="card mx-3" style={{ backgroundColor: "#313537", width: "50%", height: "20rem" }}>
            <div className="card-body">
              <p className="card-text" style={{ color: "#d3d3d3" }}>
                {highlightMatches(string || "Your result will be displayed here; currently no matches", result.split("ˍ").filter(word => word.trim() !== ""))}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="center" style={{ marginTop: "30px", textAlign: "center" }}>
        <h4 style={{ color: "#d3d3d3" }}>Captured Groups:</h4>
        {result && result !== "Error: Invalid pattern or input" ? (
          result.split("ˍ").map((match, index) => (
            <p key={index} style={{ color: "#ffcc00", display: "flex", flexDirection: "column", margin: "10px"}}>
              <strong>Capture {index + 1}:</strong> <span style={{ color: "#14fc1c" }}>{match}</span>
            </p>
          ))
        ) : (
          <p style={{ color: "#d3d3d3" }}>No matches found</p>
        )}
      </div>
    </>
  );
}

export default Main;