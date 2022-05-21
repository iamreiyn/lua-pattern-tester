export default function MenuNavbar() {
  return (
    <>
      <button
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
        <ul className="navbar-nav mr-auto" style={{ marginLeft: "20rem" }}>
          <li className="nav-item active">
            <a className="nav-link active" aria-current="page" href="/">
              <i className="fa fa-house-user" style={{ fontSize: "20px" }}></i>
              {" "} Home
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/renisal/lua-pattern-tester/fork"
            >
              <i className="fa fa-code-fork" style={{ fontSize: "20px" }}></i> Fork
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/renisal/lua-pattern-tester/issues/new/choose"
            >
              <i className="fa fa-edit" style={{ fontSize: "20px" }}></i>{" "}
              Issue
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              target="_blank"
              rel="noreferrer"
              href="https://renisal.github.io/regex-validator"
            >
              <i className="fa fa-dollar" style={{ fontSize: "20px" }}></i>{" "}
              Regex
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link mx-5"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/renisal"
            >
              {" "}
              by{" "}
              <label style={{ cursor: "pointer", color: "lightblue" }}>
                renisal
              </label>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
