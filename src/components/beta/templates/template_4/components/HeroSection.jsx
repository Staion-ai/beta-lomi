import React from 'react'

import '../assets/styles/HeroSection.css';

const HeroSection = ({
  title,
  subtitle,
  cta_button: cta,
  background_image: backgroundImage,
  social_proof: socialProof
}) => {
  return (
    <>
      <section
        className={`${backgroundImage ? "section-bg " : "no-bg"}`}
        id="/"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        }}
      >
        <div className='section-content'>
          <h1 className="title-hero">{title}</h1>
          <p className="subtitle-hero">{subtitle}</p>
          <p className="">{socialProof.text}</p>
        </div>

        <div className="container-button">
          <a
            href={cta.url}
            className="cta-button"
          >
            {cta.label}
          </a>
        </div>
      </section>
    </>
  )
}

export default HeroSection