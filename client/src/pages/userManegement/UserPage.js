/* eslint-disable default-case */
import { React, useState, useEffect } from "react";
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
    update: false,
    create: false,
    read: false,
    valuedelete: false,
  })
  const HandleChange = async (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    const valueUpdate = document.getElementsByName("update")
    const valueCreate = document.getElementsByName("create")
    const valueDelete = document.getElementsByName("delete")
    const valueRead = document.getElementsByName("read")

    if (name !== "update" && name !== "create" && name !== "delete" && name !== "read") {
      console.log(name, value)
      setFormData({ ...formData, [name]: value });
    }
    updateAccessRight(name, value, valueUpdate, valueCreate, valueDelete, valueRead)
  };

  function updateAccessRight(name, value, valueUpdate, valueCreate, valueDelete, valueRead) {
    switch (name) {
      case "update":
        if (value === 'false') {
          valueUpdate[0].value = true
        }
        else {
          valueUpdate[0].value = false
         }
        break;
      case "create":
        if (value === 'false') {
          valueCreate[0].value = true
        }
        else { 
          valueCreate[0].value = false
        }
        break;
      case "delete":
        if (value === 'false') {
          valueDelete[0].value = true
        }
        else { 
          valueDelete[0].value = false
        }
        break;
      case "read":
        if (value === 'false') {
          valueRead[0].value = true
        }
        else { 
          valueRead[0].value = false
        }
        break;
    }
  }


  useEffect(() => {
    setAccessRight({
      update: false,
      create: false,
      valuedelete: false,
      read: false
    })
    setFormData({ ...formData, 'AccessRight': AccessRight });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(formData)
  const HandleData = (event) => {
    event.preventDefault();
    console.log(AccessRight);
    console.log(formData);
    Request.post(
      "/createstaff",
      { formData },
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
              <Form.Check inline isValid="true" value="false"
                onClick={HandleChange} label="update" name="update" type="checkbox" />
              <Form.Check inline isInvalid="true" value="false"
                onClick={HandleChange} label="delete" name="delete" type="checkbox" />
              <Form.Check inline label="create" value="false"
                onClick={HandleChange} name="create" type="checkbox" />
              <Form.Check inline label="read" value="false"
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