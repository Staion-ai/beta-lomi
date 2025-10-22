import '../assets/styles/Services.css'
import '../assets/styles/Fonts.css'
import chroma from "chroma-js";

const Services = ({ content }) => {
    const { value_proposition, styles } = content.template_content;

    const textColor = (color, fallback = "#FFFFFF") => {
        const bg = color ? chroma(color) : chroma(fallback);
        return bg.luminance() > 0.5 ? "#000000" : "#FFFFFF"
    }

    return (
        <>
            <div className="services-container" style={{ color: textColor(), fontFamily: styles.active_font }}>
                <div className='re-container'>
                    <h2 className="services-title">  {value_proposition.title}  </h2>
                    <div className="services-grid">
                        {value_proposition.content.map((item, index) => (
                            <div className="service-card" key={index}>
                                <div className="service-image">
                                    <img src={item.image_url} alt={`Service ${index + 1}`} />
                                </div>
                                <div className="service-info">
                                    <p className="description">{item.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Services
