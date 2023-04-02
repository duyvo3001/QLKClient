import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
//render the row col of table
const RowCol = (props) => {
    return (
        <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">{props.text1}</Form.Label></Col>
            <Col md={4}><Form.Control onChange={props.handle} size="sm" type="text" name={props.ID1} /></Col>
            <Col md={2}><Form.Label column="sm">{props.text2}</Form.Label></Col>
            <Col md={4}><Form.Control onChange={props.handle} size="sm" type="text" name={props.ID2} /></Col>
        </Row>
    )
};

export  default RowCol
