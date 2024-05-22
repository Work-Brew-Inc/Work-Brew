import React from 'react';
import Question from './';
import HomePage from './Pages/HomePage';
import FormPage from './Pages/FormPage';
import ShopInfoPage from './Pages/ShopInfoPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/BrewCoffee" element={<FormPage />} />
          <Route path="/shop/:id" element={<ShopInfoPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
