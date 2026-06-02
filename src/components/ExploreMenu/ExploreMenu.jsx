import React, { useRef } from "react";
import { categories } from "../../assets/assets";
import "./ExploreMenu.css";

const ExploreMenu = ({ category, setCategory }) => {
  const menuRef = useRef(null);
  const scrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="explore-menu position-relative">
      <div className="section-heading">
        <div>
          <span className="section-kicker">Browse categories</span>
          <h2>What are you hungry for?</h2>
          <p>Choose a category and find your next favorite plate.</p>
        </div>
        <div className="d-flex category-arrows">
          <i
            className="bi bi-arrow-left-circle scroll-icon"
            onClick={scrollLeft}
          ></i>
          <i
            className="bi bi-arrow-right-circle scroll-icon"
            onClick={scrollRight}
          ></i>
        </div>
      </div>
      <div
        className="d-flex justify-content-between gap-4 overflow-auto explore-menu-list"
        ref={menuRef}
      >
        {categories.map((item, index) => {
          return (
            <div
              key={index}
              className="text-center explore-menu-list-item"
              role="button"
              tabIndex={0}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.category ? "All" : item.category
                )
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setCategory((prev) =>
                    prev === item.category ? "All" : item.category
                  );
                }
              }}
            >
              <div className="category-image-shell">
              <img
                src={item.icon}
                alt={item.category}
                className={
                  item.category === category
                    ? "rounded-circle active"
                    : "rounded-circle"
                }
                height={128}
                width={128}
              />
              </div>
              <p
                className={
                  item.category === category
                    ? "mt-2 fw-bold text-active"
                    : "mt-2 fw-bold"
                }
              >
                {item.category}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMenu;
