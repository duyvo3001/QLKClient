import { React, useState } from 'react'
import { TableWareHouse as TableDT } from './TableWareHouse';
import Container from "react-bootstrap/Container";
import RowCol from '../Import/RowCol';
import ButtonSubmit from '../Import/ButtonSubmit';
import Form from "react-bootstrap/Form";
import Request from "../../api/Request.js";
import ButtonBottom from '../Import/buttonBot/buttonBottom';
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
const ImportWareHouse = () => {
  const [pageindex, setpageindex] = useState({
    page: 1,
  });
  const [filters, setfilters] = useState({
    page: 1,
  });
  const [formData, setFormData] = useState({});

  const HandleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const HandleData = () => {
    Request.post(
      "/importWarehouse",
      { formData },
      { headers: { Authorization: sessionStorage.getItem("access_token") } }
    ).then(respone => console.log(respone)
    )
      .catch((error) => {
        console.log(error);
      });
  };

  const HandleButtonClick = (newPage) => {
    setfilters({ ...filters, page: newPage, });
    setpageindex({ ...pageindex, page: newPage });
  };
  return (
    <Container>
      <h4 className="mb-3">Import : Warehouse</h4>
      <Form onSubmit={HandleData}>
        <RowCol
          handle={HandleChange}
          text1="ID Warehouse"
          ID1="MaKho"
          text2="Name Warehouse"
          ID2="TenKho"
        />
         <Row className='mb-2 row'>
          <Col md={2}><Form.Label column="sm">Address</Form.Label></Col>
          <Col md={4}><Form.Control onChange={HandleChange} size="sm" as="textarea" type="text" name="DiaChi" /></Col>
          <Col md={2}><Form.Label column="sm">Phone</Form.Label></Col>
          <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="number" name="SDT" /></Col>
        </Row>
        <ButtonSubmit />
      </Form>
      <TableDT filters={filters} setfilters={setfilters} />
      <ButtonBottom pageindex={pageindex} HandleButtonClick={HandleButtonClick} />
    </Container>
  )
}

export default ImportWareHouse