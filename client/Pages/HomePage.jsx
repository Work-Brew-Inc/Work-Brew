import React from 'react';
import axios from 'axios';
import '../Styles/Homepage.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [shops, setShops] = useState([]);
  const navigate = useNavigate();

  const getSavedShops = async () => {
    console.log('Retrieving saved shops');
    try {
      const response = await axios.get(
        'Brew/OrderCoffee'
      );
      console.log('Response is', response.data);
      setShops(response.data);
    } catch (err) {
      console.log('Error in retrieving shops:', err);
    }
  };

  useEffect(() => {
    getSavedShops();
  }, []);

  return (
    <div className="center">
      <h1>WorkBrew</h1>
      <h3>Your favorite remote workspaces, all in one place!</h3>
      <h4>Your Saved Locations</h4>
      <div className="shop-list">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="shop-card"
            onClick={() => navigate(`/shop/${shop.id}`, { state: { shop } })}
          >
            <h4>{shop.name}</h4>
            <p>{shop.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
