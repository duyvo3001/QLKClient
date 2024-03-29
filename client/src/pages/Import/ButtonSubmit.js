import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const ButtonSubmit = () => {
  return (
    <Row className='mb-2 row'>
      <Col md={3}>
        <Button  type="submit" variant="success">Add</Button>
      </Col>
      <Col md={11}></Col>
    </Row>
  )
}

export default ButtonSubmit