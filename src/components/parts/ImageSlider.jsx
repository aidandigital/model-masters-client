import { useState } from "react";
import Image from "./Image";
import Button from "./Button";

const ImageSlider = (props) => {
  const [slideIndex, setSlideIndex] = useState(0);

  function next() {
    if (slideIndex + 1 === props.images.length) {
      setSlideIndex(0);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  }

  function back() {
    if (slideIndex === 0) {
      setSlideIndex(props.images.length - 1);
    } else {
      setSlideIndex(slideIndex - 1);
    }
  }

  return (
    <div>
      {props.images.map((image, i) => (
        <div className={i !== slideIndex ? "hidden" : ""}>
          <Image src={image} />
        </div>
      ))}
      <div className="text-center m-2">
        <Button onClick={next}>{"<"}</Button>
        <Button onClick={back}>{">"}</Button>
      </div>
    </div>
  );
};

export default ImageSlider;

