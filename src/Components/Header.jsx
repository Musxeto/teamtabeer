import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    const images = [
      "/assets/1.png",
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []);

  return (
    <header
      className="text-center mb-6 hover:cursor-pointer"
      onClick={() => navigate("/")}
    >
      {randomImage && (
        <img
          src={randomImage}
          alt="Header Logo"
          className="w-auto max-w-[150px] h-auto mx-auto z-10"
        />
      )}
    </header>
  );
};

export default Header;
