const { useState } = require("react");
const fengari = require("fengari-web");
const Highlighter = require("react-highlight-words");

function Main() {
  const [string, setString] = useState("");
  const [result, setResult] = useState("");
  const [pattern, setPat] = useState("");

  const executeLuaFunction = (inputString, inputPattern) => {
    try {
      let func = fengari.load(`
        return function(string, pattern)
          local match = string.match(string, pattern)
          if match then
            return match
          else
            return ""
          end
        end
      `)();
  
      return func.call(inputString, inputPattern);
    } catch (error) {
      console.error("Lua execution error:", error);
      return "Error: Invalid pattern or input";
    }
  };
  

  const onChangeString = (event) => {
    const newString = event.target.value.trim(); // Trim input string
    setString(newString);
  
    const ret = executeLuaFunction(newString, pattern);
    setResult(ret);
  };
  
  const onChangePatterns = (event) => {
    const newPattern = event.target.value.trim(); // Trim pattern
    setPat(newPattern);
  
    const ret = executeLuaFunction(string, newPattern);
    setResult(ret);
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
            aria-label="Lua Patterns (e.g. %d+ to match numbers)"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <span
              className="input-group-text"
              id="basic-addon2"
              style={{
                borderBottomLeftRadius: "0px",
                borderTopLeftRadius: "0px",
                backgroundColor: "#313537",
                borderColor: "#313537",
                color: result && result !== "Error: Invalid pattern or input" ? "green" : "red",
              }}
            >
              <strong>
                {result && result !== "Error: Invalid pattern or input" ? "Matches" : "No Matches"}
              </strong>
            </span>
          </div>
        </div>
        <p></p>
      </div>

      <div className="center">
        <div style={{ display: "flex", width: "700px" }}>
          <textarea
            onChange={onChangeString}
            style={{
              resize: "none",
              width: "50%",
              borderColor: "#313537",
              backgroundColor: "#313537",
              color: "#d3d3d3",
            }}
            placeholder="Enter your text here to be matched"
            aria-label="Enter your text here to be matched"
            className="form-control"
            id="myBoxwhite"
            rows="8"
          ></textarea>

          <div
            className="card mx-3"
            style={{
              backgroundColor: "#313537",
              width: "50%",
              height: "20rem",
            }}
          >
            <div className="card-body">
              <p
                className="card-text"
                style={{ marginTop: "-10px", marginLeft: "-3px" }}
              >
                <Highlighter
                  style={{ color: string ? "#d3d3d3" : "#696969" }}
                  highlightClassName="highlitedString"
                  searchWords={result.split("ˍ").filter((word) => word)}
                  caseSensitive={true}
                  autoEscape={true}
                  textToHighlight={
                    string ? string : "Your result will be displayed here; currently no matches"
                  }
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Main;