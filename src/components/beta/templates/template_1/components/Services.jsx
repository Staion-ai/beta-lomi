import '../assets/styles/Services.css'
import '../assets/styles/Fonts.css'
import content from '../data/template_structure.json'


const Services = ({ content }) => {
    const { value_proposition, styles } = content;
    return (
        <>
            <div className="services-container" style={{ color: styles.color_tertiary, fontFamily: styles.active_font }}>
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
                                    <p className="description">{item.description}</p>
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
