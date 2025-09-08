import '../assets/styles/NavBar.css'

import React from 'react'

const NavBar = ({ logo, options: links, cta_button: cta }) => {
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
              <a href={`#${link.url}`}>
                {link.label}
              </a>
            </li>
          ))}
          {/* CTA Button */}
          <a href={cta.url} className='cta-button'>
            {cta.label}
          </a>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar