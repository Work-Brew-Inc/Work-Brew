import React from 'react';
import axios from 'axios';
import '../Styles/Homepage.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Components/SearchBar';

const HomePage = () => {
  const [shops, setShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const getSavedShops = async () => {
    console.log('Retrieving saved shops');
    try {
      const response = await axios.get('Brew/OrderCoffee');
      console.log('Response is', response.data);
      setShops(response.data);
    } catch (err) {
      console.log('Error in retrieving shops:', err);
    }
  };

  useEffect(() => {
    getSavedShops();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredShops = shops.filter((shop) =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="center">
      <h1>WorkBrew</h1>
      <h3>Your favorite remote workspaces, all in one place!</h3>
      <SearchBar
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ mt: '20px' }}
      />
      <div className="cards-container">
        {filteredShops.map((shop) => (
          <div
            key={shop.id}
            className="shop-card"
            onClick={() => navigate(`/shop/${shop.id}`, { state: { shop } })}
          >
            <h4 className="shopName">{shop.name}</h4>
            <p className="shopLocation">{shop.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
