const { useState } = require("react");
const fengari = require("fengari-web");

function Contents() {

  const [string, setString] = useState("");
  const [result, setResult] = useState("");

  const onChangePatterns = (event) => {
    let patterns = string;
    let func = fengari.load(`return function(event, patterns)
    local js = require "js"
      local result = string.match(event, patterns)
    return result
end`)();
    let ret = func.call(patterns, event.target.value);
    setResult(ret);
  };
  const onChangeString = (event) => {
    setString(event.target.value);
  };
  return (
    <div className="container my-5">
      <h1><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Lua-Logo.svg/600px-Lua-Logo.svg.png?20150107024942" height="60px" width="70px" alt="lua"/>  Lua Patterns: Match, Test & Build</h1>
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
          disabled={!string?true:false}
        />
        <div className="input-group-append">
          <span className="input-group-text" id="basic-addon2" style={{color: "blue"}}>
            <strong>Patterns</strong>
          </span>
        </div>
      </div>
      <div style={{display: "flex"}}>
      <textarea
        onChange={onChangeString}
        style={{ width: "600px"}}
        placeholder="Enter your string here to be matched"
        aria-label="Enter your string here to be matched"
        className="form-control"
        id="myBoxwhite"
        rows="8"
      ></textarea>
      <textarea
        style={{ height: "300px", width: "500px", borderColor: result?"green":"blue"}}
        placeholder="Your result will be displayed here; currently no matches"
        aria-label="Your result will be displayed here; currently no matches"
        className="form-control mx-3"
        id="myBoxwhite"
        rows="8"
        value={result}
        disabled
      ></textarea></div>
    </div>
  );
}

export default Contents;
