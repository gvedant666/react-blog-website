import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="title">
      <section className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Blog Layout</h1>
            <div className="seperator"></div>
            <nav className="navbar">
              <Link to="/">Home</Link>
              <Link to="/create" style={{ marginLeft: "20px" }}>
                New Blog
              </Link>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
