import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const ServiceList = (props) => {
    const changeSelectedService = (service) => {
        props.setSelectedService(service)
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor:'grey',borderColor:'grey'}}>
                {props.selectedService}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {props.serviceArray.map((service, index) => (
                    <Dropdown.Item key={index} onClick={() => changeSelectedService(service.name)}>
                        {service.name}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default ServiceList;