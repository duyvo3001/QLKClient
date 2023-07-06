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

  const [DataBrand, setDataBrand] = useState([])
  const [DataWarehouse, setDataWarehouse] = useState([]);
  const [DataSupplier, setDataSupplier] = useState([]);

  const HandleChange = (event, newvalue) => {
    if (newvalue) {
      setFormData({ ...formData, [newvalue?.key]: newvalue?.label });
    }
    else {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    }
  };
  // const HandleSelection = (event, value) =>{console.log(value);
  //   setSelected(value);}
  const HandleData = (event) => {
    event.preventDefault();
    Request.post(
      "/PostStock",
      { formData },
      { headers: { Authorization: sessionStorage.getItem("access_token") } }
    )
      .then((response) => {
        if (response.status === 200) {
          const {
            MaLK,
            TenLK,
            Donvi,
            Soluong,
            MaThuongHieu,
            MaNCC,
            Color,
            MaKho,
            GiaBanLe,
            TinhTrangHang
          } = document.getElementsByName("MaLK", "TenLK", "Donvi", "Soluong", "MaThuongHieu", "MaNCC", "Color", "MaKho", "GiaBanLe", "TinhTrangHang");

          MaLK[0].value = "";
          TenLK[0].value = "";
          Donvi[0].value = "";
          Soluong[0].value = "";
          MaThuongHieu[0].value = "";
          MaNCC[0].value = "";
          Color[0].value = "";
          MaKho[0].value = "";
          GiaBanLe[0].value = "";
          TinhTrangHang[0].value = "";
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
          return object.push({ label: key?.[keyName], key: keyName })
        })
        SetData(object)
      })
      .catch((error) => { console.log(error) })
  }
  useEffect(() => {

    RequestRouterSearch("SearchBrand", "MaThuongHieu", setDataBrand)
    RequestRouterSearch("SearchWarehouse", "MaKho", setDataWarehouse)
    RequestRouterSearch("SearchSupplier", "MaNCC", setDataSupplier)

  }, [])

  const ColorArr = [
    { label: 'black', key: 'Color' },
    { label: 'red', key: 'Color' },
    { label: 'blue', key: 'Color' },
    { label: 'green', key: 'Color' },
    { label: 'yellow', key: 'Color' },
    { label: 'white', key: 'Color' },
    { label: 'pink', key: 'Color' },
    { label: 'gray', key: 'Color' },
    { label: 'purple', key: 'Color' },
    { label: 'gold', key: 'Color' },
    { label: 'Platinum', key: 'Color' },
    { label: 'Brown', key: 'Color' },
    { label: 'Orange', key: 'Color' },
    { label: 'Silver', key: 'Color' },
    // Add more color objects as needed
  ];

  const StatusProduct = [
    { label: 'GOOD', key: "TinhTrangHang" },
    { label: 'BAD', key: "TinhTrangHang" },
    { label: 'CANCEL', key: "TinhTrangHang" },
  ]

  useEffect(() => {// Render table when Import
    setfilters({
      page: 1,
    })
  }, [Show, ShowEror])
  let valuehidden = true
  return (
    <>
      <Container fluid="xxl">
        <h4 className="mb-3">Import : Product</h4>
        <Form onSubmit={HandleData}>
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">ID Product</Form.Label></Col>
            <Col md={4}>
              <TextField
                fullWidth={true}
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
                fullWidth={true}
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
                fullWidth={true}
                id="MaThuongHieu"
                size="small"
                options={DataBrand}
                sx={{ width: 350 }}
                onChange={HandleChange}
                name="MaThuongHieu"
                renderInput={(params) => <TextField {...params} onChange={HandleChange} name="MaThuongHieu" />}
              />
            </Col>
            <Col md={2}><Form.Label column="sm">Color</Form.Label></Col>
            <Col md={4}>
              <Autocomplete
                fullWidth={true}
                disablePortal
                id="combo-box-demo"
                size="small"
                options={ColorArr}
                sx={{ width: 350 }}
                onChange={HandleChange}
                name="Color"
                renderInput={(params) => <TextField {...params} onChange={HandleChange} name="Color" />}
              /></Col>
          </Row>

          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">Unit</Form.Label></Col>
            <Col md={4}>
              <TextField
                fullWidth={true}
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
                fullWidth={true}
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
                fullWidth={true}
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
                fullWidth={true}
                disablePortal
                id="combo-box-demo"
                size="small"
                options={DataWarehouse}
                sx={{ width: 350 }}
                onChange={HandleChange}
                name="MaKho"
                renderInput={(params) => <TextField {...params} onChange={HandleChange} name="MaKho" />}
              /></Col>
          </Row>

          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">Product status</Form.Label></Col>
            <Col md={4}>
              <Autocomplete
                fullWidth={true}
                disablePortal
                id="combo-box-demo"
                size="small"
                options={StatusProduct}
                sx={{ width: 350 }}
                onChange={HandleChange}
                name="TinhTrangHang"
                renderInput={(params) => <TextField {...params} onChange={HandleChange} name="TinhTrangHang" />}
              />
            </Col>
            <Col md={2}><Form.Label column="sm">ID Supplier</Form.Label></Col>
            <Col md={4}>
              <Autocomplete
                fullWidth={true}
                disablePortal
                id="combo-box-demo"
                size="small"
                options={DataSupplier}
                sx={{ width: 350 }}
                onChange={HandleChange}
                name="MaNCC"
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
        <TableDT filters={filters} valuehidden={valuehidden} />
        <ButtonBottom
          pageindex={pageindex}
          HandleButtonClick={HandleButtonClick}
        />
      </div>
    </>
  );
};

export default ImportStock;
