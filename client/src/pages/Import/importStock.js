import { TableDT } from "./table/tableDTStock";
import { React, useState } from "react";
import Container from "react-bootstrap/Container";
import RowCol from "./RowCol";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Request from "../../api/Request.js";
import ButtonSubmit from "./ButtonSubmit";
import ButtonBottom from "../Import/buttonBot/buttonBottom";
import { AlterShowSuccess, AlterShowEror } from "../../components/Alter/AlterShow";

const ImportStock = () => {
  const [pageindex, setpageindex] = useState({
    page: 1,
  });
  const [filters, setfilters] = useState({
    page: 1,
  });
  const [formData, setFormData] = useState({});

  const [Show, setShow] = useState({
    valueShow: false,
    message: ""
  });
  const [ShowEror, setShowEror] = useState({
    valueShow: false,
    message: ""
  });
  const HandleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const HandleData = (event) => {
    event.preventDefault();
    Request.post(
      "/PostStock",
      { formData },
      { headers: { Authorization: sessionStorage.getItem("access_token") } }
    )
      .then((response) => {
        if (response.status === 200) {
          setShow({
            valueShow: true,
            message: response.data.message
          })
        }
        else {
          setShowEror({
            valueShow: true,
            message: response.data.message
          })
        }
      })
      .catch((error) => {
        console.log(error.response.status)
        if (error.response.status === 500) {
          setShowEror({
            valueShow: true,
            message: error.response.data.message
          })
        }
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
    <>
      <Container fluid="xxl">
        <h4 className="mb-3">Import : Product</h4>
        <Form onSubmit={HandleData}>
          <RowCol
            handle={HandleChange}
            text1="ID Product"
            ID1="MaLK"
            text2="Name Product"
            ID2="TenLK"
          />
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">ID Brand</Form.Label></Col>
            <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="text" name="MaThuongHieu" /></Col>
            <Col md={2}><Form.Label column="sm">Color</Form.Label></Col>
            <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="text" name="Color" /></Col>
          </Row>
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">Category</Form.Label></Col>
            <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="text" name="Donvi" /></Col>
            <Col md={2}><Form.Label column="sm">Quantity</Form.Label></Col>
            <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="number" name="Soluong" /></Col>
          </Row>
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">Retail price</Form.Label></Col>
            <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="number" name="GiaBanLe" /></Col>
            <Col md={2}><Form.Label column="sm">ID Warehouse</Form.Label></Col>
            <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="text" name="MaKho" /></Col>
          </Row>
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">Product status</Form.Label></Col>
            <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="text" name="TinhTrangHang" /></Col>
            <Col md={2}><Form.Label column="sm">ID Supplier</Form.Label></Col>
            <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="text" name="MaNCC" /></Col>
          </Row>
          <ButtonSubmit />
          <AlterShowEror ShowEror={ShowEror} setShowEror={setShowEror} />
          <AlterShowSuccess Show={Show} setShow={setShow} />
        </Form>
      </Container>
      <div>
        <TableDT filters={filters} />
        <ButtonBottom
          pageindex={pageindex}
          HandleButtonClick={HandleButtonClick}
        />
      </div>
    </>
  );
};

export default ImportStock;
