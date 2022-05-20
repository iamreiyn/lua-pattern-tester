const { useState } = require("react");
const fengari = require("fengari-web");
const Highlighter = require("react-highlight-words");

function Main() {
  const [string, setString] = useState("");
  const [result, setResult] = useState("ˍnilˍ");
  const [pattern, setPat] = useState("");

  const onChangePatterns = (event) => {
    setPat(event.target.value);
    let pattern = event.target.value;
    let func = fengari.load(`return function(string, pattern)
    local r1, r2, r3 = string.match(string, pattern)
    total = string.format("%sˍ%sˍ%s", r1, r2, r3)
    return total
    end`)();
    let ret = func.call(string, pattern);
    setResult(ret);
  };

  const onChangeString = (event) => {
    setString(event.target.value);
    let string = event.target.value;
    let func = fengari.load(`return function(string, pattern)
    local r1, r2, r3 = string.match(string, pattern)
    total = string.format("%sˍ%sˍ%s", r1, r2, r3)
    return total
    end`)();
    let ret = func.call(string, pattern);
    setResult(ret);
  };

  return (
    <div className="container my-4 center">
      <div style={{ width: "685px" }} className="input-group mb-3">
        <input
          onChange={onChangePatterns}
          style={{ backgroundColor: "#d3d3d3" }}
          id="patterns"
          type="text"
          className="form-control"
          placeholder="Lua Patterns"
          aria-label="Lua Patterns"
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append">
          <span
            className="input-group-text"
            id="basic-addon2"
            style={{
              borderBottomLeftRadius: "0px",
              borderTopLeftRadius: "0px",
              backgroundColor: "#d3d3d3",
              color: string.match(result[0]) ? "green" : "blue",
            }}
          >
            <strong>
              {string.match(result[0]) ? "Matches" : "No Matches"}
            </strong>
          </span>
        </div>
      </div>
      <div style={{ display: "flex", width: "700px" }}>
        <textarea
          onChange={onChangeString}
          style={{
            resize: "none",
            width: "50rem",
            borderColor: "#222428",
            backgroundColor: "#d3d3d3",
          }}
          placeholder="Enter your string here to be matched"
          aria-label="Enter your string here to be matched"
          className="form-control"
          id="myBoxwhite"
          rows="8"
        ></textarea>

        <div
          className="card mx-3"
          style={{
            backgroundColor: "#d3d3d3",
            width: "50rem",
            height: "20rem",
          }}
        >
          <div className="card-body">
            <p
              className="card-text"
              style={{ marginTop: "-10px", marginLeft: "-3px" }}
            >
              <Highlighter
                style={{ color: string ? "black" : "#696969" }}
                highlightClassName="highlitedString"
                searchWords={result.split("ˍ")}
                caseSensitive={true}
                autoEscape={true}
                textToHighlight={
                  string ? string : "Your result will be displayed here"
                }
              />
            </p>
          </div>
        </div>
      </div>
      <p></p>
    </div>
  );
}

export default Main;
