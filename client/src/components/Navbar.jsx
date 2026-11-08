import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Job Tracker</h2>

      <div className="nav-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/applications"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Applications
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
