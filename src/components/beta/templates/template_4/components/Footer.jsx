import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTiktok } from "react-icons/fa";

import '../assets/styles/Footer.css'

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
  const filteredLinks = sms.social_links.filter((link) =>
    sms.active.includes(link.platform)
  );

  return (
    <footer className="footer">
      <div className="footer-top">
        <a href={logo.link_url} className="footer-logo">
          <img src={logo.image_url} alt={logo.alt_text} />
        </a>

        <div className="footer-subtitles">
          {engaging_subtitles.map((subtitle, idx) => (
            <p key={idx}>{subtitle}</p>
          ))}
        </div>
      </div>

      <div className="footer-middle">
        <div className="social-media">
          <h4>{sms.subtitle}</h4>
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
                >
                  {Icon && <Icon />}
                </a>
              );
            })}
          </div>
        </div>

        <div className="contact">
          <h4>{contact.subtitle}</h4>
          <ul>
            {contact.contact_info.map((info, idx) => (
              <li key={idx}>
                <strong>{info.type}:</strong> {info.value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{develop_by}</p>
      </div>
    </footer>
  )
}

export default Footer