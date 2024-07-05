import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Generate from "./Generate";
import Samples from "./Samples";
import Footer from "./Footer";

const App = () => {
  return (
    <>
      <div className="background_img">
        <Navbar />
        <Home />
        <Generate />
        <Samples />
        <Footer />
      </div>
    </>
  );
};

export default App;
