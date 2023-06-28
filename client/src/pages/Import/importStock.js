import { TableDT } from "./table/tableDTStock";
import { React, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Request from "../../api/Request.js";
import ButtonSubmit from "./ButtonSubmit";
import ButtonBottom from "../Import/buttonBot/buttonBottom";
import { AlterShowSuccess, AlterShowEror } from "../../components/Alter/AlterShow";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

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
  const [selected, setSelected] = useState([]);

  const [DataBrand, setDataBrand] = useState({})
  const [DataWarehouse, setDataWarehouse] = useState({});
  const [DataSupplier, setDataSupplier] = useState({});
  const HandleChange = (event) => {
    console.log(value);
    const { name, value } = event.target;
    console.log(name, value);
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
          let text = document.getElementsByName("MaLK")
          let text1 = document.getElementsByName("TenLK")
          let text2 = document.getElementsByName("Donvi")
          let text3 = document.getElementsByName("Soluong")
          let text4 = document.getElementsByName("MaThuongHieu")
          let text5 = document.getElementsByName("MaNCC")
          let text6 = document.getElementsByName("Color")
          let text7 = document.getElementsByName("MaKho")
          let text8 = document.getElementsByName("GiaBanLe")
          let text9 = document.getElementsByName("TinhTrangHang")
          text[0].value = ""
          text1[0].value = ""
          text2[0].value = ""
          text3[0].value = ""
          text4[0].value = ""
          text5[0].value = ""
          text6[0].value = ""
          text7[0].value = ""
          text8[0].value = ""
          text9[0].value = ""
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
      })
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
  function RequestRouterSearch(Url, keyName, SetData) {
    Request
      .get(`/${Url}`,
        { headers: { Authorization: sessionStorage.getItem("access_token") } })
      .then((response) => {

        const object = []
        response?.data?.result?.map((key) => {
          return object.push({ label: key?.[keyName] })
        })
        SetData(object)
        console.log(object);
      })
      .catch((error) => { console.log(error) })
  }
  useEffect(() => {

    RequestRouterSearch("SearchBrand", "MaThuongHieu", setDataBrand)
    RequestRouterSearch("SearchWarehouse", "MaKho", setDataWarehouse)
    RequestRouterSearch("SearchSupplier", "MaNCC", setDataSupplier)

  }, [])

  const ColorArr = [
    { label: 'black' },
    { label: 'red' },
    { label: 'blue' },
    { label: 'green' },
    { label: 'yellow' },
    { label: 'white' },
    { label: 'pink' },
    { label: 'gray' },
    { label: 'purple' },
    { label: 'gold' },
    { label: 'Platinum' },
    { label: 'Brown' },
    { label: 'Orange' },
    { label: 'Silver' },
    // Add more color objects as needed
  ];

  const StatusProduct = [
    { label: 'ready_to_pick' },
    { label: 'picking' },
    { label: 'delivering' },
    { label: 'storing' },
    { label: 'return' },
    { label: 'returned' },
    { label: 'cancel' },
    { label: 'delivered' },
    { label: 'waiting_to_return' },
    { label: 'delivery_fail' },
    { label: 'money_collect_delivering' },

  ]

  useEffect(() => {// Render table when Import
    setfilters({
      page: 1,
    })
  }, [Show, ShowEror])

  return (
    <>
      <Container fluid="xxl">
        <h4 className="mb-3">Import : Product</h4>
        <Form onSubmit={HandleData}>
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">ID Product</Form.Label></Col>
            <Col md={4}>
              <TextField
                id="outlined-number"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                name="MaLK"
                sx={{ width: 350 }}
                onChange={HandleChange}
                size="small"
              /></Col>
            <Col md={2}><Form.Label column="sm">Name Product</Form.Label></Col>
            <Col md={4}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={3}
                size="small"
                sx={{ width: 350 }}
                name="TenLK"
                onChange={HandleChange}
              /></Col>
          </Row>

          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">ID Brand</Form.Label></Col>
            <Col md={4}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={DataBrand}
                sx={{ width: 350 }}
                onClick={HandleChange}
                renderInput={(params) => <TextField {...params} onChange={HandleChange} name="MaThuongHieu" />}
              />
            </Col>
            <Col md={2}><Form.Label column="sm">Color</Form.Label></Col>
            <Col md={4}><Autocomplete
              disablePortal
              id="combo-box-demo"
              size="small"
              options={ColorArr}
              sx={{ width: 350 }}
              renderInput={(params) => <TextField {...params} onChange={HandleChange} name="Color" />}
            /></Col>
          </Row>

          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">Category</Form.Label></Col>
            <Col md={4}>
              <TextField
                id="outlined-number"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                name="Donvi"
                sx={{ width: 350 }}
                onChange={HandleChange}
                size="small"
              />
            </Col>
            <Col md={2}><Form.Label column="sm">Quantity</Form.Label></Col>
            <Col md={4}>
              <TextField
                id="outlined-number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ width: 350 }}
                onChange={HandleChange}
                name="Soluong"
                size="small"
              />
            </Col>
          </Row>

          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">Retail price</Form.Label></Col>
            <Col md={4}>
              <TextField
                id="outlined-number"
                type="number"
                sx={{ width: 350 }}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                name="GiaBanLe"
                onChange={HandleChange}
              />
            </Col>
            <Col md={2}><Form.Label column="sm">ID Warehouse</Form.Label></Col>
            <Col md={4}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={DataWarehouse}
                sx={{ width: 350 }}
                renderInput={(params) => <TextField {...params} onChange={HandleChange} name="MaKho" />}
              /></Col>
          </Row>

          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">Product status</Form.Label></Col>
            <Col md={4}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={StatusProduct}
                sx={{ width: 350 }}
                renderInput={(params) => <TextField {...params} onChange={HandleChange} name="TinhTrangHang" />}
              />
            </Col>
            <Col md={2}><Form.Label column="sm">ID Supplier</Form.Label></Col>
            <Col md={4}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={DataSupplier}
                sx={{ width: 350 }}
                renderInput={(params) => <TextField {...params} onChange={HandleChange} name="MaNCC" />}
              />
            </Col>
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
