import React from 'react'

import '../assets/styles/Testimony.css';

const Testimony = ({ title, testimonials }) => {
    return (
        <div className="testimony_container" id='/contact'>
            <h3>{title}</h3>
            <div className="testimonials">
                {testimonials.map((item, index) => (
                    <div key={index} className="testimonial">
                        <img src={item.client_image} alt={item.client_name} />
                        <p>{item.client_name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimony