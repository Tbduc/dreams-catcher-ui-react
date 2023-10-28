import Carousel from "react-bootstrap/Carousel";
import firstImage from "../../../assets/images/main_banner_dreamer.jpg";
import secondImage from "../../../assets/images/main_banner_mentor.jpg";

function CarouselMain() {
  return (
    <Carousel fade className="home-banner">
      <Carousel.Item>
        <img className="home-banner-image" src={firstImage} />
      </Carousel.Item>
      <Carousel.Item>
        <img className="home-banner-image" src={secondImage} />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselMain;