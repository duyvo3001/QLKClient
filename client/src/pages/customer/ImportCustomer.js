import { React, useState } from 'react'
import Container from "react-bootstrap/Container";
import RowCol from "../Import/RowCol";
import Form from 'react-bootstrap/Form';
import ButtonSubmit from "../Import/ButtonSubmit";
import Request from "../../api/Request";
import ButtonBottom from "../Import/buttonBot/buttonBottom";
import { TableCustomer } from '../Import/table/TableCustomer';
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const ImportCustomer = () => {
  const [pageindex, setpageindex] = useState({
    page: 1,
  });
  const [filters, setfilters] = useState({
    page: 1,
  });
  const [formData, setFormData] = useState({});
  const HandleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  }
  const HandleData = () => {
    Request.post(
      "/ImportCustomer",
      { formData },
      { headers: { Authorization: sessionStorage.getItem("access_token") } }
    ).catch((error) => {
      console.log(error);
    });
  };
  const HandleButtonClick = (newPage) => {
    setfilters({
      ...filters,
      page: newPage,
    });
    setpageindex({ ...pageindex, page: newPage });
  };
  return (
    <Container>
      <h4 className="mb-3">Import : Customer</h4>
      <Form onSubmit={HandleData}>
        <RowCol handle={HandleChange} text1="ID Customer" ID1="IDCustomer" text2="Name Customer" ID2="NameCustomer" />
        <Row className='mb-2 row'>
          <Col md={2}><Form.Label column="sm">Phone</Form.Label></Col>
          <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="number" name="Phone" /></Col>
          <Col md={2}><Form.Label column="sm">Email</Form.Label></Col>
          <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="email" name="Email" /></Col>
        </Row>
        <ButtonSubmit />
      </Form>
      <TableCustomer filters={filters} setfilters={setfilters} />
      <ButtonBottom
        pageindex={pageindex}
        HandleButtonClick={HandleButtonClick}
      />
    </Container>
  )
}

export default ImportCustomer