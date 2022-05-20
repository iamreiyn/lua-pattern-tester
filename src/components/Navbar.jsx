import { useState } from "react";
import NavbarChild2 from "./NavbarChild2";
import NavbarChild3 from "./NavbarChild3";

function Navbar() {
  const [menu, setStatus] = useState(false);
  function switchMenu() {
    if (menu) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  }
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ marginTop: "50px" }}
    >
      <h1 className="text-white try">
        <i
          onClick={switchMenu}
          className="fa fa-random"
          style={{
            borderRadius: "50%",
            paddingLeft: "5px",
            paddingRight: "5px",
            paddingTop: "5px",
            paddingBottom: "5px",
            color: menu ? "#d3d3d3" : "darkblue",
            cursor: "pointer",
            backgroundColor: menu ? "darkblue" : "#d3d3d3",
            fontSize: "30px",
          }}
        ></i> <label className="badgeCustom">Switch</label>
      </h1>
      {menu ? <NavbarChild2 /> : <NavbarChild3 />}
    </nav>
  );
}
export default Navbar;
