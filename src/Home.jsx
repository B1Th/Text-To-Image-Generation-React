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
              Generate <span class="gradient-text">images</span> with
              <span class="gradient-text"> AI</span> instantly
            </h1>
            <p>
              Get AI generated images from text straight from your browser very
              easily. You can get multiple variations of the same image.
            </p>
            <p>
              <ul>
                <li>High Quality</li>
                <li>Built For Speed</li>
                <li>Fully Unique</li>
              </ul>
            </p>
            <div className="btn">
              <a href="#gotogenerate">Generate AI Images</a>
            </div>
          </div>
        </div>
        <div className="landing_img">
          <img
            className="ball animated"
            src={ball}
            alt="ball"
            data-aos="fade-down"
          />
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
