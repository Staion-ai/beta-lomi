import React from 'react';

import '../assets/styles/HeroSection.css';

import { useCSSVar } from '../hooks/useCSSVar';
import chroma from "chroma-js";

const HeroSection = ({
  title,
  subtitle,
  background_image: backgroundImage,
  cta_button: cta,
  social_proof: socialProof
}) => {
  const primaryColor = useCSSVar("--color-primary", "#FFFFFF");

  const resolvedImage = backgroundImage ? new URL(backgroundImage, import.meta.url).href : undefined;

  const textColor = (color, fallback = "#FFFFFF") => {
    const bg = color ? chroma(color) : chroma(fallback);
    return bg.luminance() > 0.5 ? "#000000" : "#FFFFFF";
  };

  return (
    <>
      <section
        className={`${backgroundImage ? "section-bg " : "no-bg"}`}
        id="/inicio"
        style={{
          backgroundImage: resolvedImage ? `url(${resolvedImage})` : "none"
        }}
      >
        <div className='section-content' style={{ color: textColor(primaryColor) }}>
          <h1 className="title-hero" style={{ color: textColor(primaryColor) }}>{title}</h1>
          <p className="subtitle-hero" style={{ color: textColor(primaryColor) }}>{subtitle}</p>
          <a
            href={cta.url}
            target="_blank" rel="noopener noreferrer"
            className="cta-button"
            style={{ color: textColor(primaryColor) }}
          >
            {cta.label}
          </a>
          <p>{socialProof.text}</p>
        </div>
      </section>
    </>
  );
};

export default HeroSection