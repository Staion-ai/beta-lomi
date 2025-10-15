import React from 'react'

import '../assets/styles/Testimony.css'

import chroma from "chroma-js";

const Testimony = ({ title, testimonials }) => {

    const textColor = (color, fallback = "#FFFFFF") => {
        const bg = color ? chroma(color) : chroma(fallback);
        return bg.luminance() > 0.5 ? "#000000" : "#FFFFFF";
    };

    return (
        <section className="testimony-section">
            <h2 className="testimony-title" style={{ color: textColor() }}>{title}</h2>
            <div className="testimony-grid">
                {testimonials.map((item, index) => (
                    <div key={index} className="testimony-card">
                        <img
                            src={item.client_image}
                            alt={item.client_name}
                            className="testimony-img"
                        />
                        <p className="testimony-name" style={{ color: textColor() }}>{item.client_name}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Testimony