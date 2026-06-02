import React, { useState } from 'react';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import './ExploreFood.css';

const ExploreFood = () => {
  const [category, setCategory] = useState('All');
  const [searchText, setSearchText] = useState('');
  return (
    <main className="container explore-page">
      <section className="explore-page-hero py-4">
        <div className="row align-items-center gy-4">
          <div className="col-lg-7">
            <span className="section-kicker">Explore menu</span>
            <h1 className="display-6 fw-bold mt-2">Find your next favorite dish</h1>
            <p className="text-muted mb-0">
              Search by name or browse curated categories to discover delicious meals.
            </p>
          </div>
          <div className="col-lg-5">
            <form className="explore-search-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group shadow-sm rounded-4 overflow-hidden">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for dishes..."
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                />
                <button className="btn btn-primary" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} searchText={searchText} />
    </main>
  );
}

export default ExploreFood;