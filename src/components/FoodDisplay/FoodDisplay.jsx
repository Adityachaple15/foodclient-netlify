import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';

const FoodDisplay = ({category, searchText}) => {

    const {foodList} = useContext(StoreContext);
    const filteredFoods = foodList.filter(food => (
        (category === 'All' || food.category === category) &&
        food.name.toLowerCase().includes(searchText.toLowerCase())
    ));
  return (
    <section className="food-display">
        <div className="menu-heading">
            <div>
                <span className="section-kicker">Fresh picks</span>
                <h2>{category === 'All' ? 'Popular dishes near you' : `${category} you will love`}</h2>
            </div>
            <span className="menu-count">{filteredFoods.length} items</span>
        </div>
        <div className="row">
            {filteredFoods.length > 0 ? (
                filteredFoods.map((food, index) => (
                    <FoodItem key={food.id || index} 
                        name={food.name} 
                        description={food.description}
                        id={food.id}
                        imageUrl={food.imageUrl}
                        price={food.price} />
                ))
            ) : (
                <div className="empty-menu text-center mt-4">
                    <i className="bi bi-search"></i>
                    <h4>No food found.</h4>
                    <p>Try another category or search term.</p>
                </div>
            )}
        </div>
    </section>
  )
}

export default FoodDisplay;
