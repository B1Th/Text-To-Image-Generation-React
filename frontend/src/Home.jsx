import React, { useEffect } from "react";
import landing_img from "./images/hand.png";
import ball from "./images/ball.png";
import Aos from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 2000, once: true });
  }, []);
  return (
    <>
      <div className="landing">
        <div className="landing_des" data-aos="fade-right">
          <div className="landing_des_content">
            <h1>
              Generate <span className="gradient-text">images</span> with
              <span className="gradient-text"> AI</span> instantly
            </h1>
            <p>
              Get AI generated images from text straight from your browser very
              easily. You can get multiple variations of the same image.
            </p>
            <ul>
              <li>High Quality</li>
              <li>Built For Speed</li>
              <li>Fully Unique</li>
            </ul>
            <div className="btn">
              <a href="#gotogenerate">Get Started</a>
            </div>
          </div>
        </div>
        <div className="landing_des">
          <div className="ball">
            <img
              className="animated"
              src={ball}
              alt="ball"
              data-aos="fade-down"
            />
          </div>
          <img
            className="hand"
            src={landing_img}
            alt="landing hand"
            data-aos="fade-left"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
