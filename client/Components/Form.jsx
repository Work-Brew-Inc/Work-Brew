import * as React from 'react';
import Question from './Question';
import { useState } from 'react';
import CustomText from './TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import '../Styles/Form.css';

const Form = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (label, value) => {
    setFormData((prev) => ({
      ...prev,
      [label]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = async () => {
    console.log('data is', formData);
    try {
      const response = await axios.post('http://localhost:3000/Brew/BrewCoffee', formData);
      console.log('Response', response.data);
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
    { label: 'Noise Level', options: ['Quiet', 'Ambient', 'Varies', 'Loud'] },
    {
      label: 'Food Available',
      options: ['Drinks Only', 'Snacks/Pastries', 'Meals'],
    },
    { label: 'Price', options: ['$', '$$', '$$$', '$$$$'] },
    { label: 'Outlets', options: ['0', '1-5', '5-10', '10+'] },
    { label: 'Ergonomics', options: ['Poor', 'Standard', 'Comfortable'] },
    { label: 'Standing Tables', options: ['Yes', 'No'] },
    { label: 'Bathroom', options: ['Yes', 'No'] },
    { label: 'Temperature Control', options: ['Poor', 'Decent', 'Good'] },
    {
      label: 'Accessibility Features',
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
        <div className="intro">{intro}</div>
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
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form;
