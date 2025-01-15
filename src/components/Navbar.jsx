function Navbar() { 
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
    >
     <h1
        style={{
          color: "#d3d3d3",
          backgroundColor: "darkblue",
          borderRadius: "50%",
          paddingTop: "10px",
          paddingBottom: "10px",
          marginLeft: "36%",
        }}
      >
        Lua
      </h1>{" "}
      <h1 className="mx-3" style={{ color: "#d3d3d3" }}>
        {" "}
        Pattern<br></br>Tester
      </h1> <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse mx-5"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link active" aria-current="page" href="/">
              <i className="fa fa-house-user" style={{ fontSize: "20px" }}></i>
           <br></br>  Home
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/reiyncode/lua-pattern-tester"
            >
              <i className="fa fa-code-fork" style={{ fontSize: "20px" }}></i><br></br>  Source
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/reiyncode/lua-pattern-tester/issues/new/choose"
            >
              <i className="fa fa-edit" style={{ fontSize: "20px" }}></i>{" "}
              <br></br>  Issue
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              target="_blank"
              rel="noreferrer"
              href="https://www.lua.org/pil/20.2.html"
            >
              <i className="fa fa-book" style={{ fontSize: "20px" }}></i>{" "}
              <br></br>  Wiki
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link mx-5"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/reiyncode"
            >
            
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
