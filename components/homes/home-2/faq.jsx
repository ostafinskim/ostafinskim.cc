"use client";
import { faqs } from "@/data/faqs";
import React, { useEffect, useRef, useState } from "react";

export default function Faq() {
  const questionRefs = useRef([]);
  const answerRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  useEffect(() => {
    questionRefs.current.forEach((el) => {
      el.classList.remove("active");
    });
    answerRefs.current.forEach((el) => {
      el.style.height = "0px";
      el.style.overflow = "hidden";
      el.style.transition = "all 0.5s ease-in-out";
      el.style.marginBottom = "0px";
    });
    if (currentIndex !== -1) {
      questionRefs.current[currentIndex].classList.add("active");
      const element = answerRefs.current[currentIndex];
      element.style.height = element.scrollHeight + "px";
      element.style.overflow = "hidden";
      element.style.transition = "all 0.5s ease-in-out";
      element.style.marginBottom = "1.55em";
    }
  }, [currentIndex]);
  return (
    <dl className="accordion-1 wow fadeInUp">
      {faqs.map((elm, index) => (
        <React.Fragment key={index}>
          <dt
            onClick={() => {
              setCurrentIndex((pre) => (pre == index ? -1 : index));
            }}
          >
            <a ref={(el) => (questionRefs.current[index] = el)}>
              <span>{elm.question}</span>
              <i className="icon-plus" />
            </a>
          </dt>
          <dd
            className="black"
            ref={(el) => (answerRefs.current[index] = el)}
            style={{ display: "block" }}
          >
            {elm.answer}
          </dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
