import React from 'react';

import '../assets/styles/HeroSection.css';

const HeroSection = ({
  title,
  subtitle,
  background_image: backgroundImage,
  cta_button: cta,
  social_proof: socialProof
}) => {
  return (
    <>
      <section
        className={`${backgroundImage ? "section-bg " : "no-bg"}`}
        id="/"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none"
        }}
      >
        <div className='section-content'>
          <h1 className="title-hero">{title}</h1>
          <p className="subtitle-hero">{subtitle}</p>
          <a
            href={cta.url}
            className="cta-button"
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