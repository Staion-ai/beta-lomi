import React, { useState } from 'react'

import '../assets/styles/Faqs.css'

const Faqs = ({ title, questions, background_image: backgroundImage }) => {

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`${backgroundImage ? "faqs-section " : "faqs-no-bg"}`}
      id="/contact"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none"
      }}
    >
      <h2>{title}</h2>
      <ul className="faqs-list">
        {questions.map((q, index) => (
          <li key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => toggleAnswer(index)}
            >
              {q.question}
              <span>{openIndex === index ? "▲" : "▼"}</span>
            </button>
            {openIndex === index && (
              <p className="faq-answer">{q.answer}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Faqs