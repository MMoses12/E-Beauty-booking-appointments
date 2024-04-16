import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const CountryDropdown = () => {
  const [selectedCode, setSelectedCode] = useState('+...');

  const handleCountrySelect = (code) => {
    setSelectedCode(code);
  };

  const countryCodes = ['+30', '+40', '+50', '+156', '+126', '+78 ','+31', '+436', '+67', '+942', '+164', '+03'];

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: 'grey' ,  lineHeight: '40px' }}>
        {selectedCode}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: '80px',maxHeight: '200px', overflowY: 'auto' }}>
        {countryCodes.map((code) => (
          <Dropdown.Item
            key={code}
            style={{ fontSize: '12px', padding: '5px 10px' }}
            onClick={() => handleCountrySelect(code)}
          >
            {code}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CountryDropdown;
