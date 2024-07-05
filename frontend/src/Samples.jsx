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
import img9 from "../src/images/a_realistic_image_of_humans_fighting_with_alien_spaceship.jpg";
import img10 from "../src/images/3d_render_of_a_golden_buggati_car.jpg";
import img11 from "../src/images/teddy_bear_on_a_skateboard_in_Kathmandu.jpg";
import img12 from "../src/images/3d_image_of_helicopter_shooting_a_yeti_in_the_mountain.jpg";

const Samples = () => {
  const imagesData = [
    {
      id: 1,
      imagesrc: img1,
      title: "city of thousand balloons",
    },
    {
      id: 2,
      imagesrc: img2,
      title: "dog and little boy playing in the park ",
    },
    {
      id: 3,
      imagesrc: img3,
      title: "man and woman climbling mountian on a sheep",
    },
    {
      id: 4,
      imagesrc: img4,
      title: "a city with rainy cloud",
    },
    {
      id: 5,
      imagesrc: img5,
      title: "astronaut in space",
    },
    {
      id: 6,
      imagesrc: img6,
      title: "man with umbrella",
    },
    {
      id: 7,
      imagesrc: img7,
      title: "dog playing with a ball",
    },
    {
      id: 8,
      imagesrc: img8,
      title: "starry night sky of kathmandu",
    },
    {
      id: 9,
      imagesrc: img9,
      title: "a realistic image of human fighting against alien in spaceship",
    },
    {
      id: 10,
      imagesrc: img10,
      title: "3d render of a golden buggati car",
    },
    {
      id: 11,
      imagesrc: img11,
      title: "tedy bear on a skateboard in kathmandu",
    },
    {
      id: 12,
      imagesrc: img12,
      title: "3d image of helicopter shooting a yeti in the mountain",
    },
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
            {imagesData.map((image) => (
              <div className="sample_item" key={image.id}>
                <img src={image.imagesrc} alt="samples" />
                <div className="overlay">
                  <h3>{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Samples;
