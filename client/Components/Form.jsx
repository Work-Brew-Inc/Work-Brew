import * as React from 'react';
import Question from './Question';
import { useState } from 'react';
import CustomText from './TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import '../Styles/Form.css';

const Form = () => {
  const [formData, setFormData] = useState({});
  const [isEdited, setIsEdited] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wifiSpeed, setWifiSpeed] = useState('Wifi Speed');
  // const [wifiSpeedColor, setWifiSpeedColor] = useState('white'); // Does not work

  // useEffect(() => {
  //   if (wifiSpeed === 'Fast') {
  //     setWifiSpeedColor('green');
  //   } else if (wifiSpeed === 'Moderate') {
  //     setWifiSpeedColor('yellow');
  //   } else if (wifiSpeed === 'Slow') {
  //     setWifiSpeedColor('red');
  //   } else {
  //     setWifiSpeedColor('white');
  //   }
  // }, [wifiSpeed]);

  const handleChange = (label, value) => {
    setIsEdited(true);
    const formattedLabel = label.toLowerCase().replace(/\s+/g, '_');
    // Convert 'yes' to true and 'no' to false
    let formattedValue = value;
    if (value.toLowerCase() === 'Yes') {
      formattedValue = true;
    } else if (value.toLowerCase() === 'No') {
      formattedValue = false;
    }
    setFormData((prev) => ({
      ...prev,
      [formattedLabel]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    console.log('data is', formData);
    try {
      const response = await axios.post('Brew/BrewCoffee', formData);
      console.log('Response', response.data);
    } catch (err) {
      console.log('Error in submitting form:', err);
    }
  };

  const getWifiSpeed = async () => {
    try {
      // setWifiSpeed('Measuring Speed...');  // Does not work
      const response = await axios.get('Brew/speed');
      setWifiSpeed(response.data);
      setFormData((prev) => ({
        ...prev,
        ['wifi']: response.data,
      }));
    } catch (err) {
      console.log('Error in submitting form:', err);
    }
  };

  const shopData = [
    { label: 'Name', options: '' },
    { label: 'Location', options: '' },
    {
      label: 'Time Visited',
      options: ['Morning', 'Lunch', 'Afternoon', 'Evening'],
    },
    { label: 'Wifi', options: ['None', 'Spotty', 'Reliable', 'High-Speed'] },
    { label: 'Noise', options: ['Quiet', 'Ambient', 'Varies', 'Loud'] },
    {
      label: 'Products',
      options: ['Drinks Only', 'Snacks/Pastries', 'Meals'],
    },
    { label: 'Price', options: ['$', '$$', '$$$', '$$$$'] },
    { label: 'Outlets', options: ['0', '1-5', '5-10', '10+'] },
    { label: 'Ergonomics', options: ['Poor', 'Standard', 'Comfortable'] },
    { label: 'Standing Tables', options: ['Yes', 'No'] },
    { label: 'Bathroom', options: ['Yes', 'No'] },
    { label: 'Temperature', options: ['Poor', 'Decent', 'Good'] },
    {
      label: 'Accessibility',
      options: [
        'None',
        'Ramp',
        'Automatic Doors',
        'Wide Aisles',
        'Accessible Restrooms',
      ],
    },
    { label: 'Parking', options: ['None', 'Free', 'Paid', 'Paid Lot'] },
    { label: 'Notes', options: '' },
  ];
  const intro = [];
  const body = [];
  const notes = [];

  console.log('Here is body', body);

  const questions = shopData.map((item, index) => {
    if (index < 2) {
      intro.push(
        <CustomText
          key={index}
          label={item.label}
          options={item.options}
          value={formData[item.label] || ''}
          onChange={(value) => handleChange(item.label, value)}
        />
      );
    } else if (index === 3) {
      body.push(
        <Button
          variant="outlined"
          sx={{ mt: '15px', height: '55px' }}
          onClick={() => getWifiSpeed()}
        >
          {wifiSpeed}
        </Button>
      );
    } else if (index < 14) {
      body.push(
        <Question
          key={index}
          label={item.label}
          options={item.options}
          value={formData[item.label] || ''}
          onChange={(value) => handleChange(item.label, value)}
        />
      );
    } else {
      notes.push(
        <CustomText
          key={index}
          label={item.label}
          options={item.options}
          value={formData[item.label] || ''}
          onChange={(value) => handleChange(item.label, value)}
        />
      );
    }
  });

  return (
    <div className="shopForm">
      <div>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <h1>Add to your coffee den!</h1>
          <CoffeeMakerIcon color="primary" fontSize="large" />
        </Box>
        <div className="intro">{intro}</div>
        <Divider sx={{ m: '30px auto', color: 'black' }}></Divider>
        <div className="body">{body}</div>
        <div className="notes">{notes}</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Button
            sx={{ width: '50%', mt: '20px' }}
            variant="contained"
            onClick={() => handleSubmit()}
            color={isSubmitted ? 'success' : undefined}
            disabled={isSubmitted || !isEdited}
          >
            Submit
          </Button>
        </div>
        {isSubmitted && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="success" sx={{ mt: '15px' }}>
              Your remote office has been added!
            </Alert>
          </Stack>
        )}
      </div>
    </div>
  );
};

export default Form;
