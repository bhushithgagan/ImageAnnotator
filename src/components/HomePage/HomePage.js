import React from "react";
import HomeNav from "./HomeNav";
import HomeBody from "./HomeBody";
import AnimatedText from "./AnimatedText";
import "./styles.css";

function HomePage() {
  return (
    <div>
      <HomeNav />
      {/*<AnimatedText />*/}
      <AnimatedText textColor="grey" overlayColor="#008080">
        DaNotate
      </AnimatedText>
      <HomeBody />
    </div>
  );
}

export default HomePage;
