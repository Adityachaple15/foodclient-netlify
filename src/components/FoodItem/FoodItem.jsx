import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import '../../components/FoodItem/Food-Card.css';

const FoodItem = ({ name, description, id, imageUrl, price }) => {
  const { increaseQty, decreaseQty, quantities } = useContext(StoreContext);
  const qty = quantities?.[id] || 0;

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex">
      <div className="card food-card flex-grow-1 position-relative w-100">
        <Link to={`/food/${id}`} className="text-decoration-none">
          <div className="ratio ratio-4x3 overflow-hidden rounded-top">
            <img
              src={imageUrl}
              className="card-img-top object-fit-cover"
              alt={name}
              loading="lazy"
            />
          </div>
        </Link>

        <div className="badge price-badge position-absolute">
          <span className="fw-semibold">₹{parseFloat(price).toFixed(2)}</span>
        </div>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-2">{name}</h5>
          <p className="card-text text-muted small mb-3">{description}</p>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center gap-1">
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-half text-warning"></i>
              <span className="ms-1 small text-secondary">(4.5)</span>
            </div>
            <span className="text-muted small">You saved 10%</span>
          </div>

          <div className="mt-auto">
            {qty > 0 ? (
              <div className="d-flex align-items-center justify-content-between gap-2">
                <div
                  className="btn-group btn-group-sm"
                  role="group"
                  aria-label="quantity controls"
                >
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => decreaseQty(id)}
                  >
                    <i className="bi bi-dash-circle"></i>
                  </button>
                  <span className="btn btn-light fw-bold px-3">{qty}</span>
                  <button
                    className="btn btn-outline-success"
                    onClick={() => increaseQty(id)}
                  >
                    <i className="bi bi-plus-circle"></i>
                  </button>
                </div>
                <Link
                  to={`/food/${id}`}
                  className="btn btn-sm btn-outline-primary"
                >
                  View
                </Link>
              </div>
            ) : (
              <div className="d-flex justify-content-between">
                <Link
                  to={`/food/${id}`}
                  className="btn btn-sm btn-outline-primary"
                >
                  View
                </Link>
                <button
                  className="btn btn-sm btn-primary d-flex align-items-center gap-1 order-add-btn"
                  onClick={() => increaseQty(id)}
                >
                  <i className="bi bi-plus-circle"></i> Add
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
