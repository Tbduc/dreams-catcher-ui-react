import React, { Component } from "react";
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";
import AddDreamer from './components/pages/AddDreamer';
import AddDream from "./components/pages/AddDream";
import FundDreamer from './components/sections/FundDreamer';
import PopularDreams from './components/sections/PopularDreams';
import DreamDetails from './components/pages/DreamDetails';
import OAuth2RedirectHandler from "./components/user-oauth2/oauth2/OAuth2RedirectHandler";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/sections/LoginComponent";
import Register from "./components/sections/RegisterComponent";
import Home from './components/pages/Home'
import Profile from "./components/sections/ProfileComponent";
import PublicProfile from './components/pages/PublicProfile';
import BoardUser from "./components/sections/BoardDreamerComponent";
import BoardModerator from "./components/sections/BoardMentorComponent";
import BoardAdmin from "./components/sections/BoardAdminComponent";
import HomePage from "./components/pages/HomePage";
import AllDreams from "./components/pages/AllDreams";
import OfferDetails from "./components/pages/OfferDetails";
import OfferPage from "./components/pages/OfferPage";
import AddOffer from "./components/pages/AddOffer";
import MentorProfile from './components/pages/MentorProfile';
import CardProfile from './components/sections/ProfileUpdate'
import AllMentors from "./components/sections/AllMentors";
import ProfileTest from "./components/pages/Profile";
import PaypalComponent from "./components/sections/PaypalComponent";
import PaypalSuccess from "./components/sections/paypal/PayPalSuccess";
import PaypalError from "./components/sections/paypal/PayPalError";
import PaypalCancel from "./components/sections/paypal/PayPalCancel";
import PasswordReset from "./components/sections/password/PasswordReset";
import ConfirmNewPassword from "./components/sections/password/ConfirmNewPassword";

class App extends Component {

  render() {
    return (
        <div className="container mt-3">
          <Router>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/login/*" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
              <Route exact path="/user" element={<BoardUser />} />
              <Route exact path="/mentor" element={<BoardModerator />} />
              <Route exact path="/admin" element={<BoardAdmin />} />
              <Route exact path="/add-dreamer" element={<AddDreamer />} />
              <Route exact path="/popular-dreams" element={<PopularDreams />} />
              <Route exact path="/donate-dreamer" element={<FundDreamer />} />
              <Route exact path="/add-dream/*" element={<AddDream />} />
              <Route exact path="/dream-details/:id" element={<DreamDetails />} />
              <Route exact path="/offer-details/:id" element={<OfferDetails />} />
              <Route exact path="/all-dreams" element={<AllDreams />} />
              <Route exact path="/offer-page" element={<OfferPage />} />
              <Route exact path="/add-offer/:id" element={<AddOffer />} />
              <Route exact path="/:nickname" element={<PublicProfile />} />
              <Route exact path="/mentor/:nickname" element={<MentorProfile />} />
              <Route exact path="/mentors" element={<AllMentors />} />
              <Route exact path="/test" element={<ProfileTest />} />
              <Route exact path="/profile-update" element={<CardProfile />} />
              <Route exact path="/paypal-transfer/:id" element={<PaypalComponent />} />
              <Route exact path="/paypal-success" element={<PaypalSuccess />} />
              <Route exact path="/paypal-error" element={<PaypalError />} />
              <Route exact path="/paypal-cancel" element={<PaypalCancel />} />
              <Route exact path="/forget-password" element={<PasswordReset />} />
              <Route exact path="/confirm-reset" element={<ConfirmNewPassword />} />
            </Routes>
          </Router>
        </div>
    );
  }
}

export default App;