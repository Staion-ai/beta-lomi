import React from 'react'

import '../assets/styles/Testimony.css'

const Testimony = ({ title, testimonials }) => {
    return (
        <section className="testimony-section">
            <h2 className="testimony-title">{title}</h2>
            <div className="testimony-grid">
                {testimonials.map((item, index) => (
                    <div key={index} className="testimony-card">
                        <img
                            src={item.client_image}
                            alt={item.client_name}
                            className="testimony-img"
                        />
                        <p className="testimony-name">{item.client_name}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Testimony