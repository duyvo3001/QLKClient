import { React, useState, useEffect } from 'react'
import { TableWareHouse as TableDT } from './TableWareHouse';
import Container from "react-bootstrap/Container";
import RowCol from '../Import/RowCol';
import ButtonSubmit from '../Import/ButtonSubmit';
import Form from "react-bootstrap/Form";
import Request from "../../api/Request.js";
import ButtonBottom from '../Import/buttonBot/buttonBottom';
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { AlterShowSuccess, AlterShowEror } from "../../components/Alter/AlterShow";
import { Button } from "@mui/material";

const ImportWareHouse = () => {
  const [pageindex, setpageindex] = useState({
    page: 1,
  });
  const [filters, setfilters] = useState({
    page: 1,
  });
  const [disabledbtn, setdisabledbtn] = useState(true)

  const [formData, setFormData] = useState({
    MaKho: "", TenKho: "", DiaChi: "", SDT: ""
  });
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
      "/importWarehouse",
      { formData },
      { headers: { Authorization: sessionStorage.getItem("access_token") } }
    ).then((response) => {
      if (response.status === 200) {

        let text = document.getElementsByName("MaKho")
        let text1 = document.getElementsByName("TenKho")
        let text2 = document.getElementsByName("DiaChi")
        let text3 = document.getElementsByName("SDT")
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
    setfilters({ ...filters, page: newPage, });
    setpageindex({ ...pageindex, page: newPage });
  };

  useEffect(() => {// Render table when Import
    setfilters({
      page: 1,
    })
  }, [Show, ShowEror])
  useEffect(() => {
    const { MaKho, TenKho, DiaChi, SDT } = formData
    if (MaKho !== "" && TenKho !== "" && DiaChi !== "" && SDT !== "")
      setdisabledbtn(false)
  }, [formData])
  return (
    <Container>
      <h4 className="mb-3">Import : Warehouse</h4>
      <form>
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
          <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="number" name="SDT" min={0} /></Col>
        </Row>
        <Button variant='contained' color="success" onClick={HandleData} disabled={disabledbtn}>Add Warehouse</Button>
      </form>
      <AlterShowEror ShowEror={ShowEror} setShowEror={setShowEror} />
      <AlterShowSuccess Show={Show} setShow={setShow} />
      <TableDT filters={filters} valuehidden={true} />
      <ButtonBottom pageindex={pageindex} HandleButtonClick={HandleButtonClick} />
    </Container>
  )
}

export default ImportWareHouse