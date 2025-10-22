import { useState } from "react";
import chroma from "chroma-js";
import '../assets/styles/Faqs.css'
import '../assets/styles/Fonts.css'

const Faqs = ({ content }) => {
    const { faqs, styles } = content.template_content;
    const [openIndex, setOpenIndex] = useState(null);

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const textColor = (color, fallback = "#FFFFFF") => {
        const bg = color ? chroma(color) : chroma(fallback);
        return bg.luminance() > 0.5 ? "#000000" : "#FFFFFF"
    }

    return (
        <>
            <div className="faqs-container" style={{ color: textColor(), fontFamily: styles.active_font }}>
                <div className="question-container">
                    <h2 className="faqs-title"> {faqs.title} </h2>
                    {faqs.questions.map((item, index) => (
                        <div key={index} className={`faq-item ${openIndex === index ? "open" : ""}`} onClick={() => toggleQuestion(index)} >
                            <div className="faq-question">{item.question}</div>
                            {openIndex === index && (
                                <div className="faq-answer">{item.answer}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default Faqs
