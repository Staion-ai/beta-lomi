import '../assets/styles/Testimonials.css'
import '../assets/styles/Fonts.css'


const Testimonials = ({ content }) => {
    const { testimony, styles } = content;

    return (
        <div className="testimony-container" style={{ color: styles.color_tertiary, fontFamily: styles.active_font }}>
            <div className="re-container">
                <h2 className="testimony-title">{testimony.title}</h2>
                <div className="testimony-grid">
                    {testimony.testimonials.map((item, index) => (
                        <div className="testimony-card" key={index}>
                            <div className="client-image">
                                <img src={item.client_image} alt={`Client ${index + 1}`} />
                            </div>
                            <div className="client-info">
                                <p className="client-name">{item.client_name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Testimonials
