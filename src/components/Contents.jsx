const { useState } = require("react");
const fengari = require("fengari-web");
const Highlighter = require('react-highlight-words')

function Contents() {
  const [string, setString] = useState("");
  const [result, setResult] = useState("");
  const [pattern, setPat] = useState("");

  const onChangePatterns = (event) => {
    setPat(event.target.value)
    let pattern = event.target.value
    let func = fengari.load(`return function(string, pattern)
    local js = require "js"
    local r1, r2, r3, r4, r5, r6, r7, r8, r9, r10 = string.match(string, pattern)

    if r1 then
      total = r1
      else
      total = ""
      end
    if r2 then
      total = r1.." "..r2
      end
    if r3 then
      total = r1.." "..r2.." "..r3
    end
    if r4 then
      total = r1.." "..r2.." "..r3..""..r4
    end
    if r5 then
      total = r1.." "..r2.." "..r3..r4..r5
    end
    if r6 then
      total = r1.." "..r2.." "..r3..r4..r5..r6
    end
    if r7 then
      total = r1.." "..r2.." "..r3..r4..r5..r6..r7
    end
    if r8 then
      total = r1.." "..r2.." "..r3..r4.r5..r6..r7..r8
    end
    if r9 then
      total = r1.." "..r2.." "..r3..r4..r5..r6..r7..r8..r9
    end
    return total
end`)();
     let ret = func.call(string, pattern);
     setResult(ret)
  };
  const onChangeString = (event) => {
    setString(event.target.value);
    let string = event.target.value
    let func = fengari.load(`return function(string, pattern)
    local js = require "js"
    local r1, r2, r3, r4, r5, r6, r7, r8, r9, r10 = string.match(string, pattern)

    if r1 then
      total = r1
      else
      total = ""
      end
    if r2 then
      total = r1.." "..r2
      end
    if r3 then
      total = r1.." "..r2.." "..r3
    end
    if r4 then
      total = r1.." "..r2.." "..r3..""..r4
    end
    if r5 then
      total = r1.." "..r2.." "..r3..r4..r5
    end
    if r6 then
      total = r1.." "..r2.." "..r3..r4..r5..r6
    end
    if r7 then
      total = r1.." "..r2.." "..r3..r4..r5..r6..r7
    end
    if r8 then
      total = r1.." "..r2.." "..r3..r4.r5..r6..r7..r8
    end
    if r9 then
      total = r1.." "..r2.." "..r3..r4..r5..r6..r7..r8..r9
    end
    return total
end`)();
     let ret = func.call(string, pattern);
     setResult(ret)
  };

  return (
    <div className="container my-4">
      <h1><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Lua-Logo.svg/600px-Lua-Logo.svg.png?20150107024942" height="60px" width="65px" alt="lua"/> Lua Patterns: Match, Debug & Build</h1>
      <hr />
      <div style={{width: "1100px" }} className="input-group mb-3">
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
        style={{ width: "600px", resize: "none", borderColor: "#222428"}}
        placeholder="Enter your string here to be matched"
        aria-label="Enter your string here to be matched"
        className="form-control"
        id="myBoxwhite"
        rows="8"
      ></textarea>
      <div className="card mx-3" style={{width: "600px", height: "330px", borderColor: result?"green":"blue"}}>
  <div className="card-body">
    <p className="card-text"><Highlighter
    highlightClassName="highlitedString"
    searchWords={[result]}
    autoEscape={true}
    textToHighlight={string?string:"Your result will be displayed here; currently no matches"}
  /></p>
  </div>
</div> </div>
    </div>
  );
}

export default Contents;
