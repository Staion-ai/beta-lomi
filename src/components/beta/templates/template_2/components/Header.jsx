import { useState } from "react";
import chroma from "chroma-js";

import '../assets/styles/Header.css'
import '../assets/styles/Fonts.css'

const Header = ({ content }) => {
    const { navbar, hero_section, styles } = content;
    const [validImage, setValidImage] = useState(true);

    const textColor = (color, fallback = "#FFFFFF") => {
        const bg = color ? chroma(color) : chroma(fallback);
        return bg.luminance() > 0.5 ? "#000000" : "#FFFFFF"
    }

    const handleLinkClick = (e) => {
        e.preventDefault(); // Evita el salto instantáneo por defecto
        const targetId = e.currentTarget.getAttribute("href"); // obtiene el href del enlace
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Scroll suave hasta la sección correspondiente
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    };


    return (
        <>
            <header className="header-container" style={{ color: textColor(styles.color_primary), fontFamily: styles.active_font }}>
                <div className="navigation-container" style={{ backgroundColor: styles.color_primary }}>
                    <div className="left-navigation">

                        <div className="logo">
                            <a href={navbar.logo.link_url}>
                                <img src={navbar.logo.image_url} alt={navbar.logo.alt_text} />
                            </a>
                        </div>

                        <ul>
                            {navbar.options.map((item, index) => {
                                let hrefFixed = "#";
                                if (item.label === "Inicio") hrefFixed = "#header";
                                else if (item.label === "Servicios") hrefFixed = "#services";
                                else if (item.label === "Contacto") hrefFixed = "#footer";

                                return (
                                    <li key={index}>
                                        <a href={hrefFixed} onClick={handleLinkClick}>
                                            {item.label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="right-navigation">
                        <a target="_blank" href={navbar.cta_button.url}>
                            <button style={{ backgroundColor: styles.color_secondary, color: textColor(styles.color_secondary) }}> {navbar.cta_button.label} </button>
                        </a>
                    </div>
                </div>

                <div className="panel">

                    <div className="left-panel">
                        <div className="paragraph-container" style={{ color: textColor() }}>
                            <p className="title-parag">
                                {hero_section.title}
                            </p>
                            <p className="subtitle-parag">
                                {hero_section.subtitle}
                            </p>
                        </div>

                        <div className="btn-container"  >
                            {hero_section.cta_button && (
                                <a target="_blank" href={hero_section.cta_button.url} >
                                    <button style={{ backgroundColor: styles.color_secondary, color: textColor(styles.color_secondary) }}>{hero_section.cta_button.label}</button>
                                </a>
                            )}
                        </div>

                        <div className='hash-parag' style={{ color: textColor() }}>
                            <p>
                                {hero_section.social_proof.text}
                            </p>
                        </div>
                    </div>

                    <div className="right-panel">

                        <div className="img-header-container" style={{
                            backgroundColor: styles.color_secondary,
                        }}>
                            <img
                                src={hero_section.background_image}
                                alt="Hero background"
                                onError={(e) => (e.target.style.display = "none")}
                            />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header