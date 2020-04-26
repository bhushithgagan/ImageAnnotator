import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import HomePage from "./components/HomePage/HomePage";
import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from "./components/SignupForm/SignupForm";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import AnnotatorDashboard from "./components/AnnotatorDashboard/AnnotatorDashboard";
import AnimatedText from "./components/HomePage/AnimatedText"; 
import "./App.css";
import "./style.css"; 
function App() {
  return (
    <Router>
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          width: "100%",
          height: "50%"
        }}
      >
       <AnimatedText 
          textColor="grey" 
          overlayColor="#008080" 
        >
          DaNotate 
        </AnimatedText> 
      
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/signup">
            <SignUpForm />
          </Route>
          <Route path="/userdashboard">
            <UserDashboard />
          </Route>
          <Route path="/annotatordashboard">
            <AnnotatorDashboard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
