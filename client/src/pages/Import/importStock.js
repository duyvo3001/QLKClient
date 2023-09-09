import { TableDT } from "./table/tableDTStock";
import { React, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Request from "../../api/Request.js";
import ButtonBottom from "../Import/buttonBot/buttonBottom";
import { AlterShowSuccess, AlterShowEror } from "../../components/Alter/AlterShow";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import "../../style/styleTable.scss"
import { Button } from "@mui/material";

const ImportStock = () => {
  const [pageindex, setpageindex] = useState({
    page: 1,
  });
  const [filters, setfilters] = useState({
    page: 1,
  });
  const [formData, setFormData] = useState({
    Category: "",
    Color: "",
    Donvi: "",
    GiaBanLe: "",
    MaKho: "",
    MaNCC: "",
    MaThuongHieu: "",
    Soluong: "",
    TenLK: "",
    TinhTrangHang: "GOOD"
  });

  const [Show, setShow] = useState({
    valueShow: false,
    message: ""
  });
  const [ShowEror, setShowEror] = useState({
    valueShow: false,
    message: ""
  });

  const [DataBrand, setDataBrand] = useState([])
  const [DataCategory, setDataCategory] = useState([])
  const [DataWarehouse, setDataWarehouse] = useState([]);
  const [DataSupplier, setDataSupplier] = useState([]);
  const tpyeobj = {
    label: "",
    name: ""
  }
  const [valueAuto, setvalueAuto] = useState({
    Category: "",
    MaThuongHieu: "",
    Color: "",
    MaKho: tpyeobj,
    MaNCC: tpyeobj,
    TinhTrangHang: "GOOD",
  })
  const [disabledbtn , setdisabledbtn] = useState(true)
  function setvalueAutocomplete(newvalue) {
    if (newvalue?.key === 'MaNCC' || newvalue?.key === 'MaKho')
      setvalueAuto({ ...valueAuto, [newvalue?.key]: { label: newvalue?.label, name: newvalue?.name } })
    else
      setvalueAuto({ ...valueAuto, [newvalue?.key]: newvalue?.label })
    setFormData({ ...formData, [newvalue?.key]: newvalue?.label });
  }

  const HandleChange = (event, newvalue) => {
    if (newvalue) {
      setvalueAutocomplete(newvalue)
    }
    else {
      const { name, value } = event.target;
      const excludedNames = ["MaThuongHieu", "Category", "TinhTrangHang", "MaNCC", "MaKho"];
      if (!excludedNames.includes(name)) {
        setFormData({ ...formData, [name]: value });
        setvalueAuto({ ...valueAuto, [newvalue?.key]: newvalue?.label })
      }
    }
  };

  //   setSelected(value);}
  const HandleData = (event) => {
    event.preventDefault();
    Request
      .post(
        "/PostStock",
        { formData },
        { headers: { Authorization: sessionStorage.getItem("access_token") } }
      )
      .then((response) => {
        if (response.status === 202) {
          const TenLK = document.getElementsByName("TenLK")
          const Donvi = document.getElementsByName("Donvi")
          const Soluong = document.getElementsByName("Soluong")
          const GiaBanLe = document.getElementsByName("GiaBanLe")
          TenLK[0].value = "";
          Donvi[0].value = "";
          Soluong[0].value = "";
          GiaBanLe[0].value = "";
          setvalueAuto({
            Category: "",
            MaThuongHieu: "",
            Color: "",
            MaKho: "",
            MaNCC: "",
            TinhTrangHang: "GOOD",
          })

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

  function updateType(response, keyName, SetData, Url) {
    if (Url !== "SearchSupplier" && Url !== "SearchWarehouse") {
      const object = []
      response?.data?.result?.map((key) => {
        return object.push({ label: key?.[keyName], key: keyName })
      })
      SetData(object)
    }
    else {
      const object = []
      response?.data?.result?.map((key) => {
        return object.push({
          label: key?.[keyName],
          key: keyName,
          name: key?.[Url === "SearchSupplier" ? "TenNCC" : "TenKho"]
        })
      })
      SetData(object)
    }
  }
  function RequestRouterSearch(Url, keyName, SetData) {
    Request
      .get(`/${Url}`,
        { headers: { Authorization: sessionStorage.getItem("access_token") } })
      .then((response) => {
        updateType(response, keyName, SetData, Url)
      })
      .catch((error) => { console.log(error) })
  }
  
  useEffect(() => {
    const { Category, Color, MaNCC, MaKho, Donvi, GiaBanLe, MaThuongHieu, Soluong, TenLK } = formData
    if (Category !== "" && Color !== "" && MaNCC !== "" && MaKho !== "" && Donvi !== ""
      && MaThuongHieu !== "" && GiaBanLe !== "" && Soluong !== "" && TenLK !== "") {
        setdisabledbtn(false)
    }
  }, [formData])

  useEffect(() => {
    RequestRouterSearch("SearchCategory", "Category", setDataCategory)
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

  const defprops = {
    options: DataSupplier,
    getOptionLabel: (options) => options.label + ' - ' + options.name
  }

  const defpropsWarehouse = {
    options: DataWarehouse,
    getOptionLabel: (options) => options.label + ' - ' + options.name
  }

  return (
    <>
      <Container fluid="xxl">
        <h4 className="mb-3">Import : Product</h4>
        <Form>
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">{"Category"}</Form.Label></Col>
            <Col md={4}>
              <Autocomplete
                // disablePortal
                fullWidth={true}
                id={"Category"}
                size="small"
                options={DataCategory}
                sx={{ width: 350 }}
                onChange={HandleChange}
                name={"Category"}
                value={valueAuto.Category}
                renderInput={(params) => <TextField {...params} onChange={HandleChange} name={"Category"} />}
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
                value={valueAuto.MaThuongHieu}
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
                value={valueAuto.Color}
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
                {...defpropsWarehouse}
                sx={{ width: 350 }}
                onChange={HandleChange}
                name="MaKho"
                value={valueAuto.MaKho}
                renderInput={(params) => <TextField {...params} onChange={HandleChange} name="MaKho" />}
              /></Col>
          </Row>

          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">Product status</Form.Label></Col>
            <Col md={4}>
              <Autocomplete
                fullWidth={true}
                disablePortal
                id="TinhTrangHang"
                size="small"
                defaultValue={{ label: "GOOD", key: "TinhTrangHang" }}
                options={StatusProduct}
                sx={{ width: 350 }}
                onChange={HandleChange}
                value={valueAuto.TinhTrangHang}
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
                {...defprops}
                sx={{ width: 350 }}
                onChange={HandleChange}
                name="MaNCC"
                value={valueAuto.MaNCC}
                renderInput={(params) => <TextField {...params} onChange={HandleChange} name="MaNCC" />}
              />
            </Col>
          </Row>
          <Button onClick={HandleData} variant="contained" disabled={disabledbtn}>Add Product</Button>
          {/* <ButtonSubmit /> */}
          <AlterShowEror ShowEror={ShowEror} setShowEror={setShowEror} />
          <AlterShowSuccess Show={Show} setShow={setShow} />
        </Form>
      </Container>
      <div className="content-table">
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
