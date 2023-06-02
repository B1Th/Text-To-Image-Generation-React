import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import img1 from "../src/images/bird.jpg";
import img2 from "../src/images/cat.jpg";
import img3 from "../src/images/flower1.jpg";
import img4 from "../src/images/dog.jpg";
import img5 from "../src/images/kid.jpg";
import img6 from "../src/images/dog.jpg";
import img7 from "../src/images/mars.jpg";
import img8 from "../src/images/skii.jpg";
import img9 from "../src/images/woman.jpg";

const Samples = () => {
  useEffect(() => {
    Aos.init({ duration: 2000, once: true });
  }, []);
  return (
    <>
      <div className="sample">
        <div className="sample_content" data-aos="fade-right">
          <h1>
            Here are the <span className="gradient-text">Samples</span>
          </h1>
          <div class="grid-container">
            <div class="grid-item">
              <img src={img1} alt="" />
            </div>
            <div class="grid-item">
              <img src={img2} alt="" />
            </div>
            <div class="grid-item">
              <img src={img3} alt="" />
            </div>
            <div class="grid-item">
              <img src={img4} alt="" />
            </div>
            <div class="grid-item">
              <img src={img5} alt="" />
            </div>
            <div class="grid-item">
              <img src={img6} alt="" />
            </div>
            <div class="grid-item">
              <img src={img7} alt="" />
            </div>
            <div class="grid-item">
              <img src={img8} alt="" />
            </div>
            <div class="grid-item">
              <img src={img9} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Samples;
