/* eslint-disable default-case */
import { React, useState } from "react";
import Container from "react-bootstrap/Container";
import RowCol from "../Import/RowCol";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonSubmit from "../Import/ButtonSubmit";
import Request from "../../api/Request";
import TableUser from "../Import/table/TableUser";
import ButtonBottom from "../Import/buttonBot/buttonBottom";
import AccessRight from "./AccessRight";
import "../../style/styleTable.scss"
import { AlterShowSuccess, AlterShowEror } from "../../components/Alter/AlterShow";

const UserPage = () => {
  const [pageindex, setpageindex] = useState({
    page: 1,
  });
  const [filters, setfilters] = useState({
    page: 1,
  });
  const [Show, setShow] = useState({
    valueShow: false,
    message: "",
  });
  const [ShowEror, setShowEror] = useState({
    valueShow: false,
    message: ""
  });

  const [formData, setFormData] = useState({
    TenNV: "",
    GioiTinh: "Female",
    Email: "",
    SDT: 0,
    DiaChi: "",
    pass_nv: "",
    repass_nv: ""
  });
  const [Sex, setSex] = useState("Male");
  const objCrud = {
    create: false, delete: false, update: false, read: false
  }
  const [Accessright, setAccessright] = useState({
    Product: objCrud,
    Inventory: objCrud,
    Brand: objCrud,
    Supllier: objCrud,
    Customer: objCrud,
    Warehouse: objCrud,
    Export: objCrud,
    User: objCrud,
  })

  const HandleChange = async (event) => {
    const { name, value } = event.target;
    const Sex = event.target.id
    updateformData(name, value)
    updateSex(Sex)
  };

  function updateSex(Sex) {
    setSex(Sex === "Male" ? "Male" : "Female");
  }

  function updateformData(name, value) {
    if (name !== "Sex") {
      setFormData({ ...formData, [name]: value });
    }
  }

  const HandleData = (event) => {
    event.preventDefault();
    Request.post(
      "/createstaff",
      { formData, Accessright, Sex },
      { headers: { Authorization: sessionStorage.getItem("access_token") } }
    ).then((response) => {
      if (response.status == 201) {
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
    <>
      <Container>
        <h3>User Management</h3>
        <AlterShowEror ShowEror={ShowEror} setShowEror={setShowEror} />
        <AlterShowSuccess Show={Show.valueShow} setShow={setShow} />
        <Form onSubmit={HandleData}>
          <RowCol handle={HandleChange} text1="ID Staff" ID1="MaNV" text2="Name Staff" ID2="TenNV" />
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">Sex</Form.Label></Col>
            <Col md={2}><Form.Check id="Male" label="Male" onChange={HandleChange} size="sm" type="radio" name="Sex" /></Col>
            <Col md={2}><Form.Check id="Female" label="Female" onChange={HandleChange} size="sm" type="radio" name="Sex" /></Col>
            <Col md={2}><Form.Label column="sm">Address</Form.Label></Col>
            <Col md={4}><Form.Control as="textarea" onChange={HandleChange} size="sm" type="text" name="DiaChi" /></Col>
          </Row>
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">Date of birth</Form.Label></Col>
            <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="date" name="NgaySinh" /></Col>
            <Col md={2}><Form.Label column="sm">User Staff</Form.Label></Col>
            <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="text" name="USER_NV" /></Col>
          </Row>
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">Password</Form.Label></Col>
            <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="password" name="pass_nv" /></Col>
            <Col md={2}><Form.Label column="sm">Email</Form.Label></Col>
            <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="email" name="Email" /></Col>
          </Row>
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">Re password</Form.Label></Col>
            <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="password" name="repass_nv" /></Col>

            <Col md={2}><Form.Label column="sm">Phone</Form.Label></Col>
            <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="number" name="SDT" /></Col>
          </Row>
          <Row className='mb-2 row'>
            <Col md={2}>
              Access right
            </Col>
            <Col md={10}>
              <AccessRight Accessright={Accessright} setAccessright={setAccessright} />
            </Col>
          </Row>
          <ButtonSubmit />
        </Form>
      </Container>
      <div className="content-table">
        <TableUser filters={filters} valuehidden={true} />
        <ButtonBottom
          pageindex={pageindex}
          HandleButtonClick={HandleButtonClick}
        />
      </div>
    </>
  )
}

export default UserPage