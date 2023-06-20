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

  const HandleChange = async (event) => {
    const { name, value } = event.target;

    if (name !== "update" && name !== "create" && name !== "delete" && name !== "read") {
      console.log(name, value)
      setFormData({ ...formData, [name]: value });
    }
    updateAccessRight(name, value)
  };

  function updateAccessRight(name, value) {
    switch (name) {
      case "update":
        if (value == "false") updatePrevState(name, "true")
        else updatePrevState(name, "false")
        break;
      case "create":
        if (value == "false") updatePrevState(name, "true")
        else updatePrevState(name, "false")
        break;
      case "delete":
        if (value == "false") updatePrevState(name, "true")
        else updatePrevState(name, "false")
        break;
      default:
        if (value == "false") updatePrevState(name, "true")
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

  console.log(formData)
  const HandleData = (event) => {
    event.preventDefault();
    console.log(AccessRight);
    console.log(formData);
    Request.post(
      "/createstaff",
      { formData, AccessRight },
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
          <RowCol handle={HandleChange} text1="Sex" ID1="GioiTinh" text2="Address" ID2="DiaChi" />
          <RowCol handle={HandleChange} text1="Date of birth" ID1="NgaySinh" text2="User Staff" ID2="USER_NV" />
          <RowCol handle={HandleChange} text1="PASSWORD" ID1="pass_nv" text2="Re password" ID2="repass_nv" />
          <RowCol handle={HandleChange} text1="Email" ID1="Email" text2="Phone" ID2="SDT" />
          <Row className='mb-2 row'>
            <Col md={2}>
              Access right
            </Col>
            <Col md={10}>
              <Form.Check inline isValid="true" value={AccessRight.update}
                onClick={HandleChange} label="update" name="update" type="checkbox" />
              <Form.Check inline isInvalid="true" value={AccessRight.delete}
                onClick={HandleChange} label="delete" name="delete" type="checkbox" />
              <Form.Check inline label="create" value={AccessRight.create}
                onClick={HandleChange} name="create" type="checkbox" />
              <Form.Check inline label="read" value={AccessRight.read}
                onClick={HandleChange} name="read" type="checkbox" />
            </Col>
          </Row>
          <ButtonSubmit />
        </Form>
      </Container>
      <TableUser filters={filters} setfilters={setfilters} />
      <ButtonBottom
        pageindex={pageindex}
        HandleButtonClick={HandleButtonClick}
      />
    </>
  )
}

export default UserPage