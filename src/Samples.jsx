import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import img1 from "../src/images/bird.jpg";
import img2 from "../src/images/cat.jpg";
import img3 from "../src/images/flower1.jpg";
import img4 from "../src/images/dog.jpg";
import img5 from "../src/images/kid.jpg";
import img6 from "../src/images/flower2.jpg";
import img7 from "../src/images/mars.jpg";
import img8 from "../src/images/skii.jpg";
import img9 from "../src/images/woman.jpg";

const Samples = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

  useEffect(() => {
    Aos.init({ duration: 2000, once: true });
  }, []);

  return (
    <>
      <div className="sample">
        <div className="container">
          <h1>
            Here are some <span className="gradient-text"> Samples</span>
          </h1>
          <div className="sample_container" data-aos="fade-right">
            {images.map((image, index) => (
              <div className="sample_item" key={index}>
                <img src={image} alt="samples" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Samples;
