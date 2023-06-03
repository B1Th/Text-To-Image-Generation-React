import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Generate = () => {
  const [ImageUrl, setImageUrl] = useState("");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const generateImage = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text_prompt: inputText }),
    };
    setLoading(true);
    const response = await fetch(
      "http://127.0.0.1:8000/api/predict/",
      requestOptions
    );
    const data = await response.json();

    let imagePath = data.image.replace(/\\/g, "/");

    const imageUrl = `http://127.0.0.1:8000/media/${imagePath}`;
    setImageUrl(imageUrl);
    setLoading(false);
    console.log(ImageUrl);
  };

  useEffect(() => {
    Aos.init({ duration: 2000, once: true });
  }, []);
  return (
    <>
      {loading ? (
        <>
          <div className="generate" id="gotogenerate">
            <div className="image_generate">
              <div className="img_box">
                <h2>Image is loading...</h2>
                {ImageUrl && <img src={ImageUrl} alt="Generated" />}
              </div>
            </div>
            <div className="image_generate">
              <div className="how_to" data-aos="fade-down">
                <h1>
                  How to create <span className="gradient-text">AI</span> images
                </h1>
                <p>
                  Write prompt in the below textbar and click generate to create
                  visually unique prompts to your ideas
                </p>
                <form className="prompt_field">
                  <input
                    onChange={(e) => setInputText(e.target.value)}
                    type="text"
                    autocomplete="off"
                    placeholder={inputText}
                    name="generate"
                  />
                  <button onClick={generateImage}>Generate</button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="generate" id="gotogenerate">
          <div className="image_generate">
            <div className="img_box">
              {/* <h2>Generated Image</h2> */}
              {ImageUrl && <img src={ImageUrl} alt="Generated" />}
            </div>
          </div>
          <div className="image_generate">
            <div className="how_to" data-aos="fade-down">
              <h1>
                How to create <span className="gradient-text">AI</span> images
              </h1>
              <p>
                Write prompt in the below textbar and click generate to create
                visually unique prompts to your ideas
              </p>
              <form className="prompt_field">
                <input
                  onChange={(e) => setInputText(e.target.value)}
                  type="text"
                  autocomplete="off"
                  placeholder="Describe your image"
                  name="generate"
                />
                <button onClick={generateImage}>Generate</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Generate;
