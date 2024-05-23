import React from 'react';
import { useLocation } from 'react-router';
import Button from '@mui/material/Button';
import axios from 'axios';
import '../Styles/ShopInfoPage.css';
import { useNavigate } from 'react-router';

const ShopInfoPage = () => {
  const navigate = useNavigate();

  const deleteShop = async (rowId) => {
    try {
      const response = await axios.delete(
        'http://localhost:3000/Brew/DumpCoffee',
        {
          data: { rowId },
        }
      );
      console.log(response.data);
      navigate('/');
    } catch (err) {
      console.log('Error in deleteShop:', err);
    }
  };
  const location = useLocation();
  const { shop } = location.state || {};
  return (
    <div className="shop-info">
      <div>
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
        {/*/<p>
          <strong>Distance:</strong> {shop.distance}
        </p>/*/}
        <p>
          <strong>Ergonomics:</strong> {shop.ergonomics ? 'Yes' : 'No'}
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
          <strong>Standing Tables:</strong>{' '}
          {shop.standing_tables ? 'Yes' : 'No'}
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => deleteShop(shop.id)}
        style={{ marginTop: '20px', background: '#D21515' }}
      >
        Delete
      </Button>
    </div>
  );
};

export default ShopInfoPage;
