import '../assets/styles/ValueProposition.css';

import chroma from "chroma-js";

const ValueProposition = ({ title, content }) => {

  const textColor = (color, fallback = "#FFFFFF") => {
    const bg = color ? chroma(color) : chroma(fallback);
    return bg.luminance() > 0.5 ? "#000000" : "#FFFFFF";
  };

  return (
    <div className='value-section' id='/servicios'>
      <h2 style={{ color: textColor() }}>{title}</h2>
      <div className='item-container'>
        {content.map((item, index) => (
          <div key={index} className='value-item'>
            {item.image_url &&
              <img
                src={item.image_url}
                alt={`Image for ${item.name}`} />
            }
            <p style={{ color: textColor() }}>{item.name}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ValueProposition