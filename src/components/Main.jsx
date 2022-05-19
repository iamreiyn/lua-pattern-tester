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

    // ssssssssssssssssss


    console.log("hey".find("Hello", "Yellow"))
  };

  return (
    <div className="container my-4">
      <h1>
        Lua Patterns: Match, Debug & Build
      </h1>
      <hr />
      <div style={{ width: "1100px" }} className="input-group mb-3">
        <input
          onChange={onChangePatterns}
          id="patterns"
          type="text"
          className="form-control"
          placeholder="Lua Patterns"
          aria-label="Lua Patterns"
          aria-describedby="basic-addon2"
          disabled={!string ? true : false}
        />
        <div className="input-group-append">
          <span
            className="input-group-text"
            id="basic-addon2"
            style={{ color: string.match(result[0])?"green":"blue" }}
          >
            <strong>Patterns</strong>
          </span>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <textarea
          onChange={onChangeString}
          style={{ width: "600px", resize: "none", borderColor: "#222428" }}
          placeholder="Enter your string here to be matched"
          aria-label="Enter your string here to be matched"
          className="form-control"
          id="myBoxwhite"
          rows="8"
        ></textarea>
        <div
          className="card mx-3"
          style={{
            width: "600px",
            height: "330px",
            borderColor: string.match(result[0])?"green":"blue"
          }}
        >
          <div className="card-body">
            <p className="card-text">
              <Highlighter
                highlightClassName="highlitedString"
                searchWords={result.split("ˍ")}
                activeIndex={1}
                caseSensitive={true}
                autoEscape={true}
                textToHighlight={
                  string
                    ? string
                    : "Your result will be displayed here; currently no matches"
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
