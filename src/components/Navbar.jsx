import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a className="navbar-brand" href="/lua-pattern-tester">
          <div className="navbar-logo-box">
            <i className="fa-solid fa-asterisk"></i>
          </div>
          <span className="navbar-title-text">Lua Pattern Tester</span>

        </a>
      </div>


    </nav>
  );
}

export default Navbar;
