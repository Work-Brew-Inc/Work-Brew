import React from 'react';
import { useLocation } from 'react-router';

const ShopInfoPage = () => {
  const location = useLocation();
  const { shop } = location.state || {};
  return (
    <div className="shop-info">
      <h1>{shop.name}</h1>
      <p>
        <strong>Location:</strong> {shop.location}
      </p>
      <p>
        <strong>Accessibility:</strong> {shop.accessibility}
      </p>
      <p>
        <strong>Bathrooms:</strong> {shop.bathrooms ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Distance:</strong> {shop.distance}
      </p>
      <p>
        <strong>Ergonomics:</strong> {shop.ergonomics}
      </p>
      <p>
        <strong>Noise Level:</strong> {shop.noise}
      </p>
      <p>
        <strong>Outlets:</strong> {shop.outlets}
      </p>
      <p>
        <strong>Parking:</strong> {shop.parking}
      </p>
      <p>
        <strong>Price:</strong> {shop.price}
      </p>
      <p>
        <strong>Products:</strong> {shop.products}
      </p>
      <p>
        <strong>Standing Tables:</strong> {shop.standing_tables}
      </p>
      <p>
        <strong>Temperature Control:</strong> {shop.temperature}
      </p>
      <p>
        <strong>Time Visited:</strong> {shop.time_visited}
      </p>
      <p>
        <strong>Wifi:</strong> {shop.wifi}
      </p>
    </div>
  );
};

export default ShopInfoPage;
