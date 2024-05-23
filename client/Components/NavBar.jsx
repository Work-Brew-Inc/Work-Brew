import * as React from 'react';
import '../Styles/NavBar.css';
import { useNavigate } from 'react-router-dom';

import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import CoffeeTwoToneIcon from '@mui/icons-material/CoffeeTwoTone';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';

export default function Nav() {
  const navigate = useNavigate();

  return (
    <>
      <nav>
        {/* <div className="nav-background"> */}

        {/* <a href="/">
          <div className="left-nav">
            <CoffeeTwoToneIcon />
          </div>
        </a> */}
        <div className="left-nav">
          {/* <button onClick={() => navigate(`/shop/${shop.id}`, { state: { shop } })}></button>  */}
          <HomeTwoToneIcon onClick={() => navigate(`/`)} />
          <CoffeeMakerIcon onClick={() => navigate(`/BrewCoffee`)} />
        </div>

        <div className="center-nav">
          {/* <h1>WorkBrew</h1> */}
          {/* <div className="coffee-icon">
              <img src="../Assets/coffee_logo.png" />
            </div> */}
        </div>
        {/* <div className="right-nav">
          <div className="speedIndicator"></div>
        </div> */}
        {/* </div> */}
      </nav>
    </>
  );
}
