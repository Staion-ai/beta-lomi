import '../assets/styles/Header.css'
import '../assets/styles/Fonts.css'
import chroma from "chroma-js";

import { useState, useEffect, useRef } from "react";

const Header = ({ content }) => {
    const { navbar, hero_section, styles } = content.template_content;
    const [validImage, setValidImage] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const textColor = (color, fallback = "#FFFFFF") => {
        const bg = color ? chroma(color) : chroma(fallback);
        return bg.luminance() > 0.5 ? "#000000" : "#FFFFFF"
    }

    // Cerrar menú al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            // Prevenir scroll del body
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.classList.remove('menu-open');
        };
    }, [menuOpen]);

    // Cerrar menú con tecla ESC
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [menuOpen]);

    // Cerrar menú al hacer clic en un enlace
    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    // Alternar menú hamburguesa
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Cerrar menú al hacer clic en el overlay
    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            {/* Overlay para cerrar el menú */}
            <div
                className={`menu-overlay ${menuOpen ? 'active' : ''}`}
                onClick={closeMenu}
            ></div>

            <header className="header-container" style={{ color: textColor(styles.color_primary), fontFamily: styles.active_font }}>
                <div className="navigation-container" style={{ backgroundColor: styles.color_primary }} ref={menuRef}>

                    {/* Menú hamburguesa (visible en móviles) */}
                    <div
                        className={`hamburger ${menuOpen ? "open" : ""}`}
                        onClick={toggleMenu}
                        style={{ backgroundColor: styles.color_primary, color: textColor(styles.color_primary) }}
                    >
                        {menuOpen ? "✕" : "☰"}
                    </div>

                    <div className={`left-navigation ${menuOpen ? "open" : ""}`} style={{ backgroundColor: styles.color_primary, color: textColor(styles.color_primary) }}>
                        <ul>
                            {navbar.options.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.url}
                                        onClick={handleLinkClick}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="logo">
                        <a href={navbar.logo.link_url}>
                            <img src={navbar.logo.image_url} alt={navbar.logo.alt_text} />
                        </a>
                    </div>

                    <div className="right-navigation">
                        <a href={navbar.cta_button.url}>
                            <button style={{ backgroundColor: styles.color_secondary, color: textColor(styles.color_secondary) }}>
                                {navbar.cta_button.label}
                            </button>
                        </a>
                    </div>
                </div>

                <div className="img-header-container" style={{
                    backgroundColor: styles.color_secondary,
                }}>
                    <img
                        src={hero_section.background_image}
                        alt="Hero background"
                        onError={(e) => (e.target.style.display = "none")}
                    />
                </div>

                <div className="branding-container" style={{ backgroundColor: styles.color_primary, }}>
                    <div className="paragraph-container">
                        <p className="bold-parag">
                            {hero_section.title} <br />
                            {hero_section.subtitle}
                        </p>
                        <div className='hash-parag'>
                            <p>
                                {hero_section.social_proof.text}
                            </p>
                        </div>
                    </div>

                    <div className="btn-container"  >
                        {hero_section.cta_button && (
                            <a href={hero_section.cta_button.url} >
                                <button style={{ backgroundColor: styles.color_secondary, color: textColor(styles.color_secondary) }}>
                                    {hero_section.cta_button.label}
                                </button>
                            </a>
                        )}
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header