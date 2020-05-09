import React from "react";
import HomeNav from "./HomeNav";
import HomeBody from "./HomeBody";
import AnimatedText from "./AnimatedText";
import "./styles.css";
import Details from "./Details";
import CarouselHP from "./CarouselHP";
import { Link, withRouter } from "react-router-dom";
import { Button } from "semantic-ui-react";

function HomePage() {
  document.title = "DaNotate | Home";

  return (
    <div>
      <HomeNav />
      <AnimatedText textColor="grey" overlayColor="#008080">
        DaNotate
      </AnimatedText>
      <Details />
      <CarouselHP />
      <HomeBody />
    </div>
  );
}

export default withRouter(HomePage);
