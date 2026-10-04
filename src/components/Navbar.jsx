import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/context/theme";

const links = [
  { label: "Blog", to: "/blog" },
  { label: "Projects", to: "/#projects" },
  { label: "About", to: "/about" },
  { label: "Resume", to: "/resume" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();
  const menuButton = useRef(null);
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    const update = () => setHasScrolled(window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);
  useEffect(() => {
    const escape = (event) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const media = window.matchMedia("(min-width: 768px)");
    const resize = () => {
      if (media.matches) setIsMenuOpen(false);
    };
    document.addEventListener("keydown", escape);
    media.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", escape);
      media.removeEventListener("change", resize);
    };
  }, [isMenuOpen]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <nav
        aria-label="Main navigation"
        className={`site-nav ${hasScrolled || isMenuOpen ? "is-scrolled" : ""}`}
      >
        <div className="nav-inner page-width">
          <div className="desktop-links nav-left">
            {links.slice(0, 2).map((link) => (
              <Link
                key={link.label}
                to={link.to}
                aria-current={
                  location.pathname === link.to ? "page" : undefined
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link to="/" className="wordmark" aria-label="Zain — home">
            Zain
          </Link>
          <div className="nav-controls">
            <div className="desktop-links">
              {links.slice(2).map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  aria-current={
                    location.pathname === link.to ? "page" : undefined
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={
                theme === "evening"
                  ? "Switch to day mode"
                  : "Switch to evening mode"
              }
            >
              {theme === "evening" ? "Day" : "Evening"}
            </button>
            <button
              ref={menuButton}
              className="menu-toggle"
              aria-controls="mobile-navigation"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div id="mobile-navigation" className="mobile-links page-width">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
