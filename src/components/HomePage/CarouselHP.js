import React from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import logo1 from "./assets/logo1.svg";
import logo2 from "./assets/logo2.svg";
import logo3 from "./assets/logo3.svg";
import logo4 from "./assets/logo4.svg";
import logo5 from "./assets/logo5.svg";
import { Image, Container } from "semantic-ui-react";
import "./styles.css";


function CarouselHP() {
  return (
    <div className="carhp">
      <Carousel 
        enableAutoPlay 
        enableSwipe
        autoPlaySpeed={3500}
        infinite   
        easing="cubic-bezier(1,.05,.45,1.25)"
        tiltEasing="cubic-bezier(0.110, 2.5, 0, 0)"
        transitionMs={1000}
        itemsToShow={2}
        >
        <Image src = {logo1} size = "medium"/>
        <Image src = {logo2} size = "medium"/>
        <Image src = {logo3} size = "medium"/>
        <Image src = {logo4} size = "medium"/>
        <Image src = {logo5} size = "medium"/>
      </Carousel>
    </div>
  );
}

export default CarouselHP;
