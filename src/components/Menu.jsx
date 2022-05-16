function Menu() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <img className="mx-3" src="https://i.postimg.cc/5ynzMQD0/rens.png" alt="Ren's Lua Patterns"/>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse mx-5" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
      <a className="nav-link active" aria-current="page" href="/">
              <i className="fa fa-house-user" style={{fontSize:"20px"}}></i> Home
              </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="https://github.com/renisal"><i className="fa fa-user" style={{fontSize:"20px"}}></i> Creator</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="https://github.com/renisal/react-lua-patterns"><i className="fa fa-code-fork" style={{fontSize:"20px"}}></i> Source</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="https://github.com/renisal?tab=repositories"><i className="fa fa-angles-right" style={{fontSize:"20px"}}></i> More Apps</a>
      </li>
    </ul>
  </div>
</nav>
    );
}

export default Menu;