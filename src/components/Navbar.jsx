"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Heart, ShoppingCart, Menu, X } from "lucide-react"
import "../styles/navbar.css"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: "/", label: "Bosh sahifa" },
    { path: "/products", label: "Mahsulotlar" },
    { path: "/sales", label: "Chegirmalar" },
    { path: "/credit", label: "Kredit" },
    { path: "/about", label: "Biz haqimizda" },
    { path: "/contact", label: "Aloqa" },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Garand</span>
          <span className="logo-subtitle">Savdo Markazi</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar-menu">
          {navItems.map((item) => (
            <li key={item.path} className="navbar-item">
              <Link to={item.path} className={`navbar-link ${location.pathname === item.path ? "active" : ""}`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side icons */}
        <div className="navbar-actions">
          <button className="navbar-icon-btn">
            <Heart size={20} />
            <span className="icon-badge">0</span>
          </button>
          <button className="navbar-icon-btn">
            <ShoppingCart size={20} />
            <span className="icon-badge">0</span>
          </button>

          {/* Mobile menu button */}
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-menu-link ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
