// File: StepsSection.jsx
import React from "react";
import "./StepsSection.css";
import { assets } from "../assets/assets";

function StepsSection() {
  const steps = [
    {
      icon: assets.upload_btn_icon,
      title: "Upload image",
      desc: "Choose an image from your device to start removing the background instantly",
    },
    {
      icon: assets.remove_bg_icon,
      title: "Remove background",
      desc: "Our smart AI will erase the background automatically in just seconds — no clicks needed.",
    },
    {
      icon: assets.download_icon,
      title: "Download image",
      desc: "Download your image with a transparent background. Ready for product listings, profiles, and more.",
    },
  ];

  return (
    <div className="steps-section">
      <h2>
        Steps to remove <span>background</span> image in seconds
      </h2>
      <div className="cards">
        {steps.map((step, index) => (
          <div className="card" key={index}>
            <img src={step.icon} alt={step.title} />
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StepsSection;
