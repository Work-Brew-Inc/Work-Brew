import React from 'react';
import Question from './';
import Login from './Pages/Login'
import HomePage from './Pages/HomePage';
import FormPage from './Pages/FormPage';
import ShopInfoPage from './Pages/ShopInfoPage';
import EditInfoPage from './Pages/EditInfoPage.jsx';
import Nav from './Components/NavBar.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/Homepage' element = {<HomePage/>}/>
          <Route path="/BrewCoffee" element={<FormPage />} />
          <Route path="/shop/:id" element={<ShopInfoPage />} />
          <Route path="/EditShop/:id" element={<EditInfoPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
