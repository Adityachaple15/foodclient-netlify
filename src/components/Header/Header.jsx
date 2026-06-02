import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <span className="hero-chip">
          <i className="bi bi-lightning-charge-fill"></i>
          Fast delivery in Pune
        </span>

        <h1>Crave it. Click it. Enjoy it hot.</h1>
        <p>
          Explore fresh biryanis, burgers, pizzas, desserts, and comfort meals
          prepared for quick doorstep delivery.
        </p>

        <div className="hero-actions">
          <Link to="/explore" className="btn btn-primary btn-lg">
            Explore menu
            <i className="bi bi-arrow-right ms-2"></i>
          </Link>
          <Link to="/cart" className="btn btn-light btn-lg">
            View cart
          </Link>
        </div>

        <div className="hero-stats">
          <div>
            <strong>30 min</strong>
            <span>avg delivery</span>
          </div>
          <div>
            <strong>4.8</strong>
            <span>food rating</span>
          </div>
          <div>
            <strong>Fresh</strong>
            <span>daily menu</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
