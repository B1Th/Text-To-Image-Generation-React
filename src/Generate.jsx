import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Generate = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const generateImage = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setLoading(true); // Show loading animation
    setImageUrl(""); // Clear previous image
    setErrorMessage(""); // Clear previous error message

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text_prompt: inputText }),
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/predict/",
        requestOptions
      );
      const data = await response.json();

      if (data.image) {
        let imagePath = data.image.replace(/\\/g, "/");
        const newImageUrl = `http://127.0.0.1:8000/media/${imagePath}`;
        setImageUrl(newImageUrl);
      } else {
        setErrorMessage("Error: Image not found in API response");
      }
    } catch (error) {
      setErrorMessage("Error: Failed to generate the image");
      console.error("API request failed:", error);
    }

    setLoading(false); // Hide loading animation
  };

  useEffect(() => {
    Aos.init({ duration: 2000, once: true });
  }, []);

  const isGenerating = (
    <div className="image_generate">
      <div className="img_box">
        {loading && (
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        {!loading && imageUrl && <img src={imageUrl} alt="Generated" />}
        {loading && <p>Generating image, please wait.....</p>}
      </div>
    </div>
  );

  return (
    <div className="generate" id="gotogenerate">
      {isGenerating}
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
              autoComplete="off"
              placeholder="Describe your image"
              name="generate"
            />
            <button onClick={generateImage}>Generate</button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Generate;
