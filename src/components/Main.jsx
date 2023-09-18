const { useState } = require("react");
const fengari = require("fengari-web");
const Highlighter = require("react-highlight-words");

function Main() {
  const [string, setString] = useState("");
  const [result, setResult] = useState("ˍnilˍ");
  const [pattern, setPat] = useState("");

  const onChangePatterns = (event) => {
    const newPattern = event.target.value;
    setPat(newPattern);

    const escapedPattern = newPattern.replace('/', '\\/');

    let func = fengari.load(`return function(string, pattern)
      local r1, r2, r3, r4, r5, r6, r7, r8, r9, r10 = string.match(string, pattern)
      total = string.format("%sˍ%sˍ%sˍ%sˍ%sˍ%sˍ%sˍ%sˍ%sˍ%sˍ%s", r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11)
      return total
    end`)();

    let ret = func.call(string, escapedPattern);
    setResult(ret);
  };

  const onChangeString = (event) => {
    const newString = event.target.value;
    setString(newString);

    const escapedPattern = pattern.replace('/', '\\/');

    let func = fengari.load(`return function(string, pattern)
    local r1, r2, r3, r4, r5, r6, r7, r8, r9, r10 = string.match(string, pattern)
    total = string.format("%sˍ%sˍ%sˍ%sˍ%sˍ%sˍ%sˍ%sˍ%sˍ%sˍ%s", r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11)
      return total
    end`)();

    let ret = func.call(newString, escapedPattern);
    setResult(ret);
  };

  return (
    <>
    <div className="center">
      <div style={{ width: "690px", marginTop: "5vh" }} className="input-group mb-3">
        <input
          onChange={onChangePatterns}
          style={{ backgroundColor: "#313537",  borderColor: "#313537", color: "#d3d3d3" }}
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
              color: string.match(result[0]) ? "green" : "red",
            }}
          >
            <strong>
              {string.match(result[0]) ? "Matches" : "No Matches"}
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
        color: "#d3d3d3"
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
            searchWords={result.split("ˍ")}
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
