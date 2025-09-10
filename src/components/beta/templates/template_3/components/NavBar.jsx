import '../assets/styles/NavBar.css'

import React from "react";

import { useCSSVar } from '../hooks/useCSSVar';
import chroma from "chroma-js";


const Navbar = ({ logo, options: links, cta_button: cta }) => {

  const primaryColor = useCSSVar("--color-primary", "#FFFFFF");

  const textColor = (color, fallback = "#FFFFFF") => {
    const bg = color ? chroma(color) : chroma(fallback);
    return bg.luminance() > 0.5 ? "#000000" : "#FFFFFF";
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <a href="/" className='logo'>
        <img className='logo' src={logo.image_url} alt={logo.alt_text} />
      </a>
      <div className="menu-container">
        {/* Hamburger Menu */}
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </label>
        {/* Links */}
        <ul className="options">
          {links.map((link, index) => (
            <li key={index} className='option'>
              <a href={`#${link.url}`} style={{ color: textColor(primaryColor) }}>
                {link.label}
              </a>
            </li>
          ))}
          {/* CTA Button */}
          <a href={cta.url} className='cta-button' style={{ color: textColor(primaryColor) }}>
            {cta.label}
          </a>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
