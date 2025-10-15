import React, { useState } from 'react'

import '../assets/styles/Faqs.css'

import { useCSSVar } from '../hooks/useCSSVar';
import chroma from "chroma-js";

const Faqs = ({ title, questions, background_image: backgroundImage }) => {

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const primaryColor = useCSSVar("--color-primary", "#FFFFFF");

  const textColor = (color, fallback = "#FFFFFF") => {
    const bg = color ? chroma(color) : chroma(fallback);
    return bg.luminance() > 0.5 ? "#000000" : "#FFFFFF";
  };

  return (
    <div className={"faqs-no-bg"}
      id="/contact"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        color: textColor()
      }}
    >
      <h2 style={{ color: textColor(primaryColor) }}>{title}</h2>
      <ul className="faqs-list">
        {questions.map((q, index) => (
          <li key={index} className="faq-item">
            <button
              className="faq-question"
              style={{ color: textColor() }}
              onClick={() => toggleAnswer(index)}
            >
              {q.question}
              <span>{openIndex === index ? "▲" : "▼"}</span>
            </button>
            {openIndex === index && (
              <p className="faq-answer" style={{ color: textColor() }}>{q.answer}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Faqs