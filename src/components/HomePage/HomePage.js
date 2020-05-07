import React from "react";
import HomeNav from "./HomeNav";
import HomeBody from "./HomeBody";
import AnimatedText from "./AnimatedText";
import "./styles.css";
import Details from "./Details";
import CarouselHP from "./CarouselHP"

function HomePage() {
  return (
    <div>
      <HomeNav />
      {/*<AnimatedText />*/}
      <AnimatedText textColor="grey" overlayColor="#008080">
        DaNotate
      </AnimatedText>
      <Details/>
      <CarouselHP/>
      <HomeBody />
    </div>
  );
}

export default HomePage;
