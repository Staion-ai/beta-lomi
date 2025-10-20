import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTiktok } from "react-icons/fa";
import '../assets/styles/Footer.css';
import { useCSSVar } from '../hooks/useCSSVar';
import chroma from "chroma-js";

const iconMap = {
  Facebook: FaFacebook,
  Twitter: FaTwitter,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedin,
  YouTube: FaYoutube,
  TikTok: FaTiktok
};

const Footer = ({ engaging_subtitles, social_media_section: sms, contact, logo, develop_by }) => {
  // Filtrar solo los links activos
  const filteredLinks = sms.social_links.filter(link =>
    sms.active.includes(link.platform)
  );

  const primaryColor = useCSSVar("--color-primary", "#FFFFFF");

  const textColor = (color, fallback = "#FFFFFF") => {
    const bg = color ? chroma(color) : chroma(fallback);
    return bg.luminance() > 0.5 ? "#000000" : "#FFFFFF";
  };

  return (
    <footer className="footer" id="/contacto">
      <div className="footer-top">
        <div className="footer-logo">
          <a href={logo.link_url}>
            <img src={logo.image_url} alt={logo.alt_text} />
          </a>
          <div className="engaging-subtitles">
            {engaging_subtitles.map((subtitle, index) => (
              <h3 key={index} style={{ color: textColor(primaryColor) }}>
                {subtitle}
              </h3>
            ))}
          </div>
        </div>

        <div className="footer-info">
          <div className="footer-social">
            <p style={{ color: textColor(primaryColor) }}>
              {contact.subtitle}
            </p>
            <div className="social-icons">
              {filteredLinks.map((link, idx) => {
                const Icon = iconMap[link.platform];
                return (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    style={{ color: textColor(primaryColor) }}
                  >
                    {Icon && <Icon />}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer-contact">
            <ul>
              {contact.contact_info.map((item, index) => (
                <li key={index}>
                  <strong style={{ color: "#ffffff" }}>{item.type}:</strong>
                  <p style={{ color: "#ffffff" }}>{item.value}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-legal" style={{ color: textColor(primaryColor) }}>
        <div className="footer-dev">
          <small style={{ color: textColor(primaryColor) }}>
            Developed by {develop_by}
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
