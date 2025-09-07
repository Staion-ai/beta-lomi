import { useState } from "react";
import '../assets/styles/Header.css'
import '../assets/styles/Fonts.css'

const Header = ({ content }) => {
    const { navbar, hero_section, styles } = content;

    const [validImage, setValidImage] = useState(true);

    return (
        <>
            <header className="header-container" style={{ color: styles.color_tertiary, fontFamily: styles.active_font }}>
                <div className="navigation-container" style={{ backgroundColor: styles.color_primary }}>
                    <div className="left-navigation">

                        <div className="logo">
                            <a href={navbar.logo.link_url}>
                                <img src={navbar.logo.image_url} alt={navbar.logo.alt_text} />
                            </a>

                        </div>

                        <ul>
                            {navbar.options.map((item, index) => (
                                <li key={index}>
                                    <a href={item.url}> {item.label} </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="right-navigation">
                        <a href={navbar.cta_button.url}>
                            <button style={{ backgroundColor: styles.color_secondary, color: styles.color_tertiary }}> {navbar.cta_button.label} </button>
                        </a>
                    </div>
                </div>

                <div className="panel">

                    <div className="left-panel">
                        <div className="paragraph-container">
                            <p className="title-parag">
                                {hero_section.title}
                            </p>
                            <p className="subtitle-parag">
                                {hero_section.subtitle}
                            </p>
                        </div>

                        <div className="btn-container"  >
                            {hero_section.cta_button && (
                                <a href={hero_section.cta_button.url} >
                                    <button style={{ backgroundColor: styles.color_secondary, color: styles.color_tertiary }}>{hero_section.cta_button.label}</button>
                                </a>
                            )}
                        </div>

                        <div className='hash-parag'>
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
