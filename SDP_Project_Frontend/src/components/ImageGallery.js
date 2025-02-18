import React, { useState } from "react";
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="gallery-container">
      {images.map((image, index) => (
        <img
          key={index}
          src={`http://localhost:5000${image}`}
          alt={`Property ${index + 1}`}
          className={`gallery-image ${index === currentIndex ? 'active' : ''}`}
        />
      ))}
      {images.length > 1 && (
        <>
          <button
            className="gallery-button prev"
            onClick={prevImage}
          >
            ❮
          </button>
          <button
            className="gallery-button next"
            onClick={nextImage}
          >
            ❯
          </button>
          <div className="gallery-indicators">
            {images.map((_, index) => (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
              />
            ))}
          </div>
          <div className="image-count">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageGallery;