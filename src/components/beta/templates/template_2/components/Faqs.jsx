import { useState } from "react";
import '../assets/styles/Faqs.css'
import '../assets/styles/Fonts.css'

const Faqs = ({ content }) => {
    const { faqs, styles } = content;
    const [openIndex, setOpenIndex] = useState(null);

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="placeholder-faqs">
            <div className="faqs-container" style={{ color: styles.color_tertiary, fontFamily: styles.active_font }}>
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
        </div>
    )
}

export default Faqs