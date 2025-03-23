import React, { useState, useEffect } from "react";
import "../css/Navbar.css";

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        window.location.href = '/login';
    };

    return (
        <nav className={`navbar ${scrolled ? "nav-scrolled" : ""}`}>
            <div className="nav-logo">Unipay</div>

            {/* Botón de hamburguesa */}
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>

            {/* Menú de navegación */}
            <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
                <li><a href="/">Services</a></li>
                <li><a href="/prestamos.html">Préstamos</a></li>
                <li><a href="/contacto.html">contact us</a></li>
                <li><a href="#" onClick={handleLogin}>login</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
