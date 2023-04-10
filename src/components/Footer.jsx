function Footer() {
  return (
    <div>
      <ul className="list-group list-group-flush">
        <center style={{ color: "#d3d3d3" }}>
          <a
            style={{ color: "lightblue", textDecoration: "none" }}
            href="https://github.com/montymahato/lua-pattern-tester"
          >
            Lua Pattern Tester:
          </a>{" "}
          An open source and personal project
        </center>
        <center>
          <img
            className="mx-3 my-2"
            src="https://skillicons.dev/icons?i=html,css,bootstrap,js,nodejs,react"
            width="200"
            height="35"
            alt="langs"
          />
        </center>
      </ul>
    </div>
  );
}

export default Footer;
