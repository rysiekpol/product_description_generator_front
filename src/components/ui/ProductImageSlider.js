import React from 'react';
import Slider from "react-slick";
import "./ProductImageStyles.css"


const ProductImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Slider {...settings} className='container mb-5 w-75 justify-content-center'>
      {images.map((img, i) => (
        <div key={i} style={{ position: 'relative' }}>
          <img 
            src={img.image_url}
            alt={`Product${i + 1}`}
            className="w-75 shadow-1-strong img_slider"
          />
        </div>
      ))}
    </Slider>
  );
};

export default ProductImageSlider;
