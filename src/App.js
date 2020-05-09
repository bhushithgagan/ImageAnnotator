import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import HomePage from "./components/HomePage/HomePage";
import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from "./components/SignupForm/SignupForm";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import AnnotatorDashboard from "./components/AnnotatorDashboard/AnnotatorDashboard";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminSignUp from "./components/AdminSignUp/AdminSignUp";
import "./App.css";
import "./style.css";
function App() {
  return (
    <Router>
      <div>
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
          <Route path="/adminlogin">
            <AdminLogin />
          </Route>
          <Route path="/adminsignup">
            <AdminSignUp />
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
