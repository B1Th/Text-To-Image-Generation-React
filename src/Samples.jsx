import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import img1 from "../src/images/city_of_thousand_balloons.jpg";
import img2 from "../src/images/dog_and_little_boy_playing_in_the_park.jpg";
import img3 from "../src/images/man_and_woman_climbing_mountain_on_a_sheep.jpg";
import img4 from "../src/images/a_city_with_rainy_cloud.jpg";
import img5 from "../src/images/astronaut_in_space.png";
import img6 from "../src/images/man_with_umbrella.jpg";
import img7 from "../src/images/dog_playing_with_a_ball.jpg";
import img8 from "../src/images/starry_night_sky_of_kathmandu.jpg";
import img9 from "../src/images/a_sunset_above_sea_near_himalayas.jpg";
import img10 from "../src/images/3d_render_of_a_golden_buggati_car.jpg";
import img11 from "../src/images/teddy_bear_on_a_skateboard_in_Kathmandu.jpg";
import img12 from "../src/images/3d_image_of_helicopter_shooting_a_yeti_in_the_mountain.jpg";

const Samples = () => {
  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
  ];

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
