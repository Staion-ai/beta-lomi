import '../assets/styles/Footer.css'
import '../assets/styles/Fonts.css'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTiktok } from "react-icons/fa";
import chroma from "chroma-js";

const iconMap = {
    Facebook: FaFacebook,
    Twitter: FaTwitter,
    Instagram: FaInstagram,
    LinkedIn: FaLinkedin,
    YouTube: FaYoutube,
    TikTok: FaTiktok
};

const Footer = ({ activePlatforms = [], content }) => {
    const { footer, styles } = content;
    const { social_media_section } = footer;

    const filteredSocials = social_media_section.social_links.filter(link =>
        social_media_section.active.map(p => p.toLowerCase()).includes(link.platform.toLowerCase())
    );

    const textColor = (color, fallback = "#FFFFFF") => {
        const bg = color ? chroma(color) : chroma(fallback);
        return bg.luminance() > 0.5 ? "#000000" : "#FFFFFF"
    }

    return (
        <>
            <footer className='footer-container' style={{ backgroundColor: styles.color_primary, color: textColor(styles.color_primary), fontFamily: styles.active_font }}>
                <div className='content-container'>

                    <div className='footer-logo'>
                        <a href={footer.logo.link_url}>
                            <img src={footer.logo.image_url}
                                alt={footer.logo.alt_text} />
                        </a>
                    </div>

                    <div className='footer-subtitles'>
                        {footer.engaging_subtitles.map((subtitle, index) => (
                            <p key={index}>{subtitle}</p>
                        ))}
                    </div>

                    {/* Redes sociales dinámicas */}
                    <div className="social-media">
                        <p>{social_media_section.subtitle}</p>
                        <div className="social-links">
                            {filteredSocials.map((link, index) => {
                                const IconComponent = iconMap[link.platform];
                                return (
                                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                                        {IconComponent ? <IconComponent size={24} /> : link.platform}
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div className="contact-section">
                        <p>¡No dudes en contactarnos!</p>
                        <ul>
                            <li><strong>Email:</strong> {footer.contact.email}</li>
                            <li><strong>Teléfono:</strong> {footer.contact.phone}</li>
                        </ul>
                    </div>

                    <div className="legal-section">
                        <small>{footer.develop_by}</small>
                    </div>

                </div>
            </footer>
        </>
    )
}

export default Footer
