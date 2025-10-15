import React from 'react'

import '../assets/styles/Testimony.css';

import chroma from "chroma-js";

const Testimony = ({ title, testimonials }) => {

    const textColor = (color, fallback = "#FFFFFF") => {
        const bg = color ? chroma(color) : chroma(fallback);
        return bg.luminance() > 0.5 ? "#000000" : "#FFFFFF";
    };

    return (
        <div className="testimony_container" id='/contact'>
            <h3 style={{ color: textColor() }}>{title}</h3>
            <div className="testimonials">
                {testimonials.map((item, index) => (
                    <div key={index} className="testimonial">
                        <img src={item.client_image} alt={item.client_name} />
                        <p style={{ color: textColor() }}>{item.client_name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimony