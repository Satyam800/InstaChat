import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const ImageCarousel = ({ image }) => {
  const [imgLen, setImgLen] = useState(0);
  console.log(image?.[0], "imaggge");
  const img = image;
  const handleLeft = () => {
    if(imgLen==0) return
setImgLen(imgLen-1)
  };
  const handleRight = () => {
    if(imgLen==image.length-1) return
    setImgLen(imgLen+1)
  };
  return (
    <div>
      <div className=" z-0">
        <img src={image?.[imgLen]} className="w-full -z-10" />
        {image.length > 1 ? (
          <div className="  flex justify-between opacity-40 z-0 ">
            <FaArrowAltCircleLeft className="bg-pink-600 rounded-full" size={32} onClick={handleLeft} />
            <FaArrowAltCircleRight className="bg-pink-600 rounded-full" size={32} onClick={handleRight} />
          </div>
        ) : null}
      </div>
      
    </div>
  );
};

export default React.memo(ImageCarousel);
