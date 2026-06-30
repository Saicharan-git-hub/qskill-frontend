import { NavLink } from "react-router-dom";

function Navbar() {
  const navStyle = ({ isActive }) =>
    `text-xl font-extrabold tracking-wide px-4 py-2 rounded-xl transition ${
      isActive
        ? "bg-white/20 text-yellow-300 shadow-lg"
        : "text-white hover:text-purple-300"
    }`;

  return (
    <nav className="backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg p-5 flex justify-center gap-8 sticky top-0 z-50">
      <NavLink to="/" className={navStyle}>
        Translator
      </NavLink>

      <NavLink to="/password" className={navStyle}>
        Password Generator
      </NavLink>
    </nav>
  );
}

export default Navbar;