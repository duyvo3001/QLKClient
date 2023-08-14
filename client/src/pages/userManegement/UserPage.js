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


const UserPage = () => {
  const [pageindex, setpageindex] = useState({
    page: 1,
  });
  const [filters, setfilters] = useState({
    page: 1,
  });
  const [formData, setFormData] = useState({});
  const [AccessRight, setAccessRight] = useState({
    update: "false",
    create: "false",
    read: "false",
    valuedelete: "false",
  })
  const [Sex, setSex] = useState("Male");
  const HandleChange = async (event) => {
    const { name, value } = event.target;
    const Sex = event.target.id
    updateformData(name, value)

    updateSex(Sex)

    updateAccessRight(name, value)
  };

  function updateSex(Sex) {
    if (Sex === "Male")
      setSex("Male")
    else
      setSex("Female")
  }

  function updateformData(name, value) {
    if (name !== "update" && name !== "create" && name !== "delete" && name !== "read" && name !== "Sex") {
      console.log(name, value)
      setFormData({ ...formData, [name]: value });
    }
  }
  
  function updateAccessRight(name, value) {
    switch (name) {
      case "update":
        if (value === "false") updatePrevState(name, "true")
        else updatePrevState(name, "false")
        break;
      case "create":
        if (value === "false") updatePrevState(name, "true")
        else updatePrevState(name, "false")
        break;
      case "delete":
        if (value === "false") updatePrevState(name, "true")
        else updatePrevState(name, "false")
        break;
      default:
        if (value === "false") updatePrevState(name, "true")
        else updatePrevState(name, "false")
        break;
    }
  }

  function updatePrevState(key, value) {
    switch (key) {
      case "update":
        setAccessRight(prevState => ({
          ...prevState,
          update: value
        }));
        break;
      case "create":
        setAccessRight(prevState => ({
          ...prevState,
          create: value
        }));
        break;
      case "delete":
        setAccessRight(prevState => ({
          ...prevState,
          delete: value
        }));
        break;

      default:
        setAccessRight(prevState => ({
          ...prevState,
          read: value
        }));
        break;
    }

  }

  const HandleData = (event) => {
    event.preventDefault();
    Request.post(
      "/createstaff",
      { formData, AccessRight, Sex },
      { headers: { Authorization: sessionStorage.getItem("access_token") } }
    ).then((response) => { console.log(response) })
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
        <h4>User Management</h4>
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
              <Form.Check inline isValid="true" value={AccessRight.update}
                onClick={HandleChange} label="update" name="update" type="checkbox" />
              <Form.Check inline isValid="true" value={AccessRight.delete}
                onClick={HandleChange} label="delete" name="delete" type="checkbox" />
              <Form.Check inline isValid="true" label="create" value={AccessRight.create}
                onClick={HandleChange} name="create" type="checkbox" />
              <Form.Check inline isValid="true" label="read" value={AccessRight.read}
                onClick={HandleChange} name="read" type="checkbox" />
            </Col>
          </Row>
          <ButtonSubmit />
        </Form>
      </Container>
      <TableUser filters={filters} valuehidden={true} />
      <ButtonBottom
        pageindex={pageindex}
        HandleButtonClick={HandleButtonClick}
      />
    </>
  )
}

export default UserPage