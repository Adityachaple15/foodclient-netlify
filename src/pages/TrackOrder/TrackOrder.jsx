import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchOrderTracking } from "../../service/orderService";
import "./TrackOrder.css";

const padding = 0.01;

const getMarkerPosition = (lat, lng, bounds) => {
  const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
  const y = 100 - ((lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 100;

  return {
    left: `${Math.min(94, Math.max(6, x))}%`,
    top: `${Math.min(88, Math.max(12, y))}%`,
  };
};

const TrackOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadTracking = async () => {
    try {
      const data = await fetchOrderTracking(orderId);
      setOrder(data);
    } catch (error) {
      toast.error("Unable to load tracking details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTracking();
    const intervalId = setInterval(loadTracking, 4000);
    return () => clearInterval(intervalId);
  }, [orderId]);

  const bounds = useMemo(() => {
    if (!order) return null;

    return {
      minLat: Math.min(order.deliveryLat, order.customerLat) - padding,
      maxLat: Math.max(order.deliveryLat, order.customerLat) + padding,
      minLng: Math.min(order.deliveryLng, order.customerLng) - padding,
      maxLng: Math.max(order.deliveryLng, order.customerLng) + padding,
    };
  }, [order]);

  if (loading) {
    return <div className="container py-5">Loading tracking details...</div>;
  }

  if (!order || !bounds) {
    return (
      <div className="container py-5">
        <p>Tracking details are not available for this order.</p>
        <Link to="/myorders" className="btn btn-outline-primary">
          Back to orders
        </Link>
      </div>
    );
  }

  const deliveryPosition = getMarkerPosition(order.deliveryLat, order.deliveryLng, bounds);
  const customerPosition = getMarkerPosition(order.customerLat, order.customerLng, bounds);
  const delivered = order.orderStatus?.toLowerCase() === "delivered";
  const distance = Number(order.distanceKm || 0);

  return (
    <div className="container py-4 track-page">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <p className="text-muted mb-1">Order #{order.id}</p>
          <h2 className="mb-0">Live Order Tracking</h2>
        </div>
        <Link to="/myorders" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          My Orders
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="tracking-map">
            <div className="map-grid"></div>
            <div className="route-line"></div>

            <div className="map-marker delivery-marker" style={deliveryPosition}>
              <i className="bi bi-scooter"></i>
            </div>

            <div className="map-marker home-marker" style={customerPosition}>
              <i className="bi bi-house-door-fill"></i>
            </div>

            <div className="map-label restaurant-label">Restaurant</div>
            <div className="map-label customer-label">Delivery address</div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="tracking-panel">
            <span className={`status-pill ${delivered ? "delivered" : ""}`}>
              {order.orderStatus}
            </span>

            <h5 className="mt-4 mb-3">Delivery progress</h5>
            <div className="progress mb-3" role="progressbar">
              <div
                className="progress-bar"
                style={{ width: delivered ? "100%" : `${Math.max(10, 100 - distance * 18)}%` }}
              ></div>
            </div>

            <div className="tracking-stat">
              <span>Distance remaining</span>
              <strong>{delivered ? "0.00" : distance.toFixed(2)} km</strong>
            </div>

            <div className="tracking-stat">
              <span>Payment</span>
              <strong>{order.paymentStatus || "PENDING"}</strong>
            </div>

            <div className="tracking-stat">
              <span>Items</span>
              <strong>{order.orderedItems?.length || 0}</strong>
            </div>

            <hr />

            <p className="small text-muted mb-0">
              This demo updates automatically every few seconds while the order is out for delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
