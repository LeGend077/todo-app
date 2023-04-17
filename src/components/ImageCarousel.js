import React, { useState } from 'react';

const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    'https://placehold.co/100',
    'https://placehold.co/200',
    'https://placehold.co/300',
  ];

  const handlePrevClick = () => {
    const newIndex =
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex =
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  return (
    <div>
      <img
        src={images[currentImageIndex]}
        alt={`Image ${currentImageIndex}`}
        width="100"
      />
      <br />
      <button onClick={handlePrevClick}>Prev</button>&nbsp;
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default ImageCarousel;
