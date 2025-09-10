import React from 'react'

import '../assets/styles/HeroSection.css';

import { useCSSVar } from '../hooks/useCSSVar';
import chroma from "chroma-js";

const HeroSection = ({
  title,
  subtitle,
  cta_button: cta,
  background_image: backgroundImage,
  social_proof: socialProof
}) => {

  const primaryColor = useCSSVar("--color-primary", "#FFFFFF");

  const textColor = (color, fallback = "#FFFFFF") => {
    const bg = color ? chroma(color) : chroma(fallback);
    return bg.luminance() > 0.5 ? "#000000" : "#FFFFFF";
  };

  return (
    <>
      <section
        className={`${backgroundImage ? "section-bg " : "no-bg"}`}
        id="/"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        }}
      >
        <div className='section-content' style={{ color: textColor(primaryColor) }}>
          <h1 className="title-hero">{title}</h1>
          <p className="subtitle-hero" style={{ color: textColor(primaryColor) }}>{subtitle}</p>
          <p className="">{socialProof.text}</p>
        </div>

        <div className="container-button">
          <a
            href={cta.url}
            className="cta-button"
            style={{ color: textColor(primaryColor) }}
          >
            {cta.label}
          </a>
        </div>
      </section>
    </>
  )
}

export default HeroSection