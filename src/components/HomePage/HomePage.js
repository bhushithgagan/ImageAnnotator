import React from "react";
import HomeNav from "./HomeNav";
import HomeBody from "./HomeBody";

function HomePage() {
  document.title = "DaNotate | Home";

  return (
    <div>
      <HomeNav />
      {/* <HomeBody /> */}
    </div>
  );
}

export default HomePage;
