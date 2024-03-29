import { React, useState, useEffect } from 'react'
import Container from "react-bootstrap/Container";
import RowCol from "../Import/RowCol";
import Form from 'react-bootstrap/Form';
import ButtonSubmit from "../Import/ButtonSubmit";
import Request from "../../api/Request";
import ButtonBottom from "../Import/buttonBot/buttonBottom";
import { TableCustomer } from '../Import/table/TableCustomer';
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { AlterShowEror, AlterShowSuccess } from '../../components/Alter/AlterShow';
import { Button } from "@mui/material"
const ImportCustomer = () => {
  const [pageindex, setpageindex] = useState({
    page: 1,
  });
  const [filters, setfilters] = useState({
    page: 1,
  });
  const [formData, setFormData] = useState({
    NameCustomer: "", Phone: "", Email: ""
  });
  const [disabledbtn, setdisabledbtn] = useState(true)
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
  }
  const HandleData = (event) => {
    event.preventDefault();
    Request
      .post(
        "/ImportCustomer",
        { formData },
        { headers: { Authorization: sessionStorage.getItem("access_token") } }
      )
      .then((response) => {
        if (response.status === 200) {

          let text = document.getElementsByName("IDCustomer")
          let text1 = document.getElementsByName("NameCustomer")
          let text2 = document.getElementsByName("Phone")
          let text3 = document.getElementsByName("Email")
          text[0].value = ""
          text1[0].value = ""
          text2[0].value = ""
          text3[0].value = ""

          setFormData({})

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
      }
      )
      .catch((error) => {
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
  useEffect(() => {// Render table when Import
    setfilters({
      page: 1,
    })
  }, [Show, ShowEror])

  useEffect(() => {
    const { NameCustomer, Phone } = formData
    const checkform = NameCustomer !== "" && Phone !== "" 
    if (checkform) setdisabledbtn(false)
  }, [formData])

  return (
    <Container>
      <h4 className="mb-3">Import : Customer</h4>
      <Form onSubmit={HandleData}>
        {/* <RowCol handle={HandleChange} text1="ID Customer" ID1="IDCustomer" text2="Name Customer" ID2="NameCustomer" /> */}
        <Row className='mb-2 row'>
          <Col md={2}><Form.Label column="sm">Phone</Form.Label></Col>
          <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="number" name="Phone" min={0} /></Col>
          <Col md={2}><Form.Label column="sm">Email</Form.Label></Col>
          <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="email" name="Email" /></Col>
        </Row>
        <Row className='mb-2 row'>
          <Col md={2}><Form.Label column="sm">Name Customer</Form.Label></Col>
          <Col md={4}><Form.Control multiple={true} onChange={HandleChange} size="sm" type="text" name="NameCustomer" /></Col>
        </Row>
        <Button color="success" variant='contained' onClick={HandleData} disabled={disabledbtn}>Add Customer</Button>
      </Form>
      <AlterShowEror ShowEror={ShowEror} setShowEror={setShowEror} />
      <AlterShowSuccess Show={Show} setShow={setShow} />
      <TableCustomer filters={filters} valuehidden={true} />
      <ButtonBottom
        pageindex={pageindex}
        HandleButtonClick={HandleButtonClick}
      />
    </Container>
  )
}

export default ImportCustomer