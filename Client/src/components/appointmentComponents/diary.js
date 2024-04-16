import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

const Diary = (props) => {
    const [disabledDates, setDisabledDates] = useState([])

    useEffect(() => {

    }, [])

  const handleDateChange = (date) => {
    props.setDate(date)
  };

  const isDateDisabled = (date) => {
    // Add your logic to disable specific dates here
    // For example, let's disable dates in the past
    const today = new Date()
    return (date >= today && !disabledDates.some((disabledDate) => date.getTime() === disabledDate.getTime()))
  };


  return (
    <Container >
      <Row>
        <Col>
          <h4 className="card-title" style={{fontFamily:'cursive',fontWeight:"bold"}}>Choose date:</h4>
          <Form>
            <Form.Group controlId="entryForm">
              <Form.Label>Date:</Form.Label>
              <DatePicker
                selected={props.date}
                onChange={handleDateChange}
                dateFormat="MM/dd/yyyy"
                className="form-control"
                filterDate={isDateDisabled}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Diary;