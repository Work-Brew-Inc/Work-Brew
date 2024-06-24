import React from 'react';
import Question from './index.js';
import HomePage from './Pages/HomePage';
import FormPage from './Pages/FormPage';
import ShopInfoPage from './Pages/ShopInfoPage';
import EditInfoPage from './Pages/EditInfoPage';
import Nav from './Components/NavBar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/BrewCoffee" element={<FormPage />} />
          <Route path="/shop/:id" element={<ShopInfoPage />} />
          <Route path="/EditShop/:id" element={<EditInfoPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
