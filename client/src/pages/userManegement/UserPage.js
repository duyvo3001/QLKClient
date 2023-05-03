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
  const [Ischeck, setIscheck] = useState('false');

  const HandleChange = async (event) => {
    const { name, value } = event.target;
    if (name === "create" || name === "read" || name === "delete" || name === "update") {
      let checkbox = document.getElementsByName(name)
      let checkbox1 = document.getElementsByName('create')
      let checkbox2 = document.getElementsByName('read')
      let checkbox3 = document.getElementsByName('delete')
      let checkbox4 = document.getElementsByName('update')
      console.log(checkbox1[0].value, checkbox2[0].value, checkbox3[0].value,checkbox4[0].value);
      if (checkbox[0].value === "false") {     
        checkbox[0].value = "true"
        console.log(document.getElementsByName(name))
        setFormData({ ...formData, [name]: "true" });
        console.log(await formData)
      }
      else {
        checkbox[0].value = "false"
        setFormData({ ...formData, [name]: "false" });
        console.log(formData)
      }
    }
    else {
      console.log(name, value)
      setFormData({ ...formData, [name]: value });
    }
  };
  const HandleData = () => {
    Request.post(
      "/createstaff",
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
    <>
    <Container>
      <h5>User Management</h5>
      <Form onSubmit={HandleData}>
        <RowCol handle={HandleChange} text1="ID Staff" ID1="MaNV" text2="Name Staff" ID2="TenNV" />
        <RowCol handle={HandleChange} text1="Sex" ID1="GioiTinh" text2="Address" ID2="DiaChi" />
        <RowCol handle={HandleChange} text1="Date of birth" ID1="NgaySinh" text2="User Staff" ID2="USER_NV" />
        <RowCol handle={HandleChange} text1="PASSWORD" ID1="pass_nv" text2="Re password" ID2="repass_nv" />
        <RowCol handle={HandleChange} text1="Email" ID1="Email" text2="Phone" ID2="SDT"/>
        <Row className='mb-2 row'>
          <Col md={2}>
            Access right
          </Col>
          <Col md={10}>
            <Form.Check inline isValid="true" value={Ischeck} onChange={HandleChange} label="update" name="update" type="checkbox" />
            <Form.Check inline isInvalid="true" value={Ischeck} onChange={HandleChange} label="delete" name="delete" type="checkbox" />
            <Form.Check inline label="create" value={Ischeck} onChange={HandleChange} name="create" type="checkbox" />
            <Form.Check inline label="read" value={Ischeck} onChange={HandleChange} name="read" type="checkbox" />
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