import React from 'react';

import '../assets/styles/ValueProposition.css';

const ValueProposition = ({ title, content }) => {

  return (
    <div className="value-section" id='/about'>
      <h2>{title}</h2>
      <div className="value-grid">
        {content.map((item, index) => (
          <div key={index} className="value-item">
            <p className="value-text">{item.name}</p>
            {item.image_url &&
              <img src={item.image_url} alt={`Image for ${item.name}`} />
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default ValueProposition