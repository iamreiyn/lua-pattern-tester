function Navbar() {
  return (
    <nav className="navbar">
      <a className="navbar-brand" href="/">

        <h1 className="navbar-title">
          <span>(.*)</span> Lua Pattern Tester
        </h1>
      </a>
      <div className="navbar-links">
        <div className="nav-dropdown">
          <button className="nav-dropdown-btn">
            <i className="fa fa-code-fork"></i> Project <i className="fa fa-chevron-down"></i>
          </button>
          <div className="nav-dropdown-menu">
            <a className="nav-dropdown-item" href="https://github.com/iamreiyn/lua-pattern-tester" target="_blank" rel="noreferrer">
              <i className="fa fa-code-fork"></i> Source
            </a>
            <a className="nav-dropdown-item" href="https://github.com/iamreiyn/lua-pattern-tester/issues/new/choose" target="_blank" rel="noreferrer">
              <i className="fa fa-bug"></i> Feedback
            </a>
          </div>
        </div>

        <div className="nav-dropdown">
          <button className="nav-dropdown-btn">
            <i className="fa fa-star"></i> Creator <i className="fa fa-chevron-down"></i>
          </button>
          <div className="nav-dropdown-menu">
            <a className="nav-dropdown-item" href="https://www.reiyn.xyz" target="_blank" rel="noreferrer">
              <i className="fa fa-globe"></i> My website
            </a>
            <a className="nav-dropdown-item" href="https://github.com/iamreiyn" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-github"></i> My GitHub
            </a>
            <a className="nav-dropdown-item" href="mailto:montymahato@outlook.com" target="_blank" rel="noreferrer">
              <i className="fa fa-envelope"></i> Send me an email
            </a>
          </div>
        </div>

        <div className="nav-dropdown">
          <button className="nav-dropdown-btn">
            <i className="fa fa-book"></i> Docs <i className="fa fa-chevron-down"></i>
          </button>
          <div className="nav-dropdown-menu">
            <a className="nav-dropdown-item" href="https://www.lua.org/pil/20.2.html" target="_blank" rel="noreferrer">
              <i className="fa fa-list"></i> Cheatsheet
            </a>
            <a className="nav-dropdown-item" href="https://www.lua.org/manual/5.5/" target="_blank" rel="noreferrer">
              <i className="fa fa-book"></i> Lua Manual
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
