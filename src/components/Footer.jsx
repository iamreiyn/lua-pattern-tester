function Footer() {
  return (
    <div>
      <ul className="list-group list-group-flush my-5">
        <center style={{ color: "#d3d3d3" }}>
          <a
            style={{ color: "lightblue", textDecoration: "none" }}
            href="https://github.com/reiyncode/lua-pattern-tester"
          >
            Lua Pattern Tester:
          </a>{" "}
          An open source and personal project
        </center>
        <center>
          <img
            className="mx-3 my-2"
            src="https://skillicons.dev/icons?i=html,css,bootstrap,js,nodejs,react"
            width="300"
            height="35"
            alt="langs"
          />
        </center>
      </ul>
    </div>
  );
}

export default Footer;
