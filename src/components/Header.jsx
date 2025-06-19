import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "../index.css";
import logo from "../assets/Logo.png";
import CreateMenuModal from "../components/CreateMenumodal";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleMenuCreated = () => {
    setShowModal(false);

  };

  return (
    <header className="custom-header">
      {showModal && (
        <CreateMenuModal onClose={() => setShowModal(false)} onMenuCreated={handleMenuCreated} />
      )}

      <div className="header-inner">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <span className="Logo">
            <strong>DEEP</strong> NET <span className="soft">SOFT</span>
          </span>
        </div>

        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-item" onClick={() => setMenuOpen(false)}>
            HOME
          </Link>
          <Link to="/menus" className="nav-item" onClick={() => setMenuOpen(false)}>
            MENU
          </Link>
          <a href="#" className="nav-item" onClick={() => setMenuOpen(false)}>
            MAKE A RESERVATION
          </a>
          <a href="#contact" className="nav-item" onClick={() => setMenuOpen(false)}>
            CONTACT US
          </a>
          <span className="nav-item create-link" onClick={() => setShowModal(true)}>
            + Create Menu
          </span>
        </nav>
      </div>
    </header>
  );
}
