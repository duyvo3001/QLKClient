import { useEffect, React, useState, useRef } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ReactToPrint from 'react-to-print';
import Request from "../../../../api/Request";
import TableInventory from '../table/TableInventory';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import "../../scss/style.scss"
const DataProvider = () => {
    const componentRef = useRef();
    const Stockstatus = [
        { key: "Stockstatus", label: 'GOOD' },
        { key: "Stockstatus", label: 'BAD' },
        { key: "Stockstatus", label: 'CANCEL' }
    ];
    const [DataBrand, setDataBrand] = useState([])
    const [DataCategory, setDataCategory] = useState([])
    const [DataWarehouse, setDataWarehouse] = useState([]);
    const [DataStock, setDataStock] = useState([]);
    const [DataProduct, setDataProduct] = useState([]) //state dataProduct

    const [formData, setFormData] = useState({
        MaThuongHieu: "",
        MaLK: "",
        Category: "",
        MaKho: "",
        TinhTrangHang: "",
    });
    const [filters, setfilters] = useState({
        page: 1,
    });
    const [pageindex, setpageindex] = useState({
        page: 1,
    });

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
        RequestRouterSearch("SearchStock", "MaLK", setDataStock)
        RequestRouterSearch("SearchCategory", "Category", setDataCategory)
        RequestRouterSearch("SearchBrand", "MaThuongHieu", setDataBrand)
        RequestRouterSearch("SearchWarehouse", "MaKho", setDataWarehouse)
    }, [])

    useEffect(() => {
        Request
            .post(`/inventoryReport`,
                { formData },
                { headers: { Authorization: sessionStorage.getItem("access_token") } })
            .then((response) => { setDataProduct(response.data.result) })
            .catch((error) => { console.log(error) })

    }, [formData])

    const HandleChange = (event, newvalue) => {
        if (newvalue) {
            switchUpdate(newvalue)
        }
    }

    function switchUpdate(newvalue) {
        switch (newvalue?.key || newvalue) {
            case "MaThuongHieu":
                updatePrestaste("MaThuongHieu", newvalue)
                break;
            case "Category":
                updatePrestaste("Category", newvalue)
                break;
            case "MaKho":
                updatePrestaste("MaKho", newvalue)
                break;
            case "MaLK":
                updatePrestaste("MaLK", newvalue)
                break;
            default:
                updatePrestaste("TinhTrangHang", newvalue)
                break;
        }
    }

    function updatePrestaste(params, newvalue) {
        setFormData(prevState => ({
            ...prevState,
            [params]: newvalue?.label || ""
        }));
    }
    const StockOnclose = (event, newvalue) => {
        if (newvalue === "") {
            switchUpdate("MaLK")
        }
    }
    const MaKhoOnclose = (event, newvalue) => {
        if (newvalue === "") {
            switchUpdate("MaKho")
        }
    }
    const MaThuongHieuOnclose = (event, newvalue) => {
        if (newvalue === "") {
            switchUpdate("MaThuongHieu")
        }
    }
    const CategoryOnclose = (event, newvalue) => {
        if (newvalue === "") {
            switchUpdate("Category")
        }
    }
    const TinhTrangHangOnclose = (event, newvalue) => {
        if (newvalue === "") {
            switchUpdate("TinhTrangHang")
        }
    }

    return (
        <>
            <Container>
                <Row className='mb-2 row'>
                    <Col className="mb-3">
                        <h3>Inventory Report</h3>
                    </Col>
                </Row>
                <Row className='mb-2 row'>
                    <Col md={6} sm={12} lg={6}>
                        <Autocomplete
                            fullWidth={true}
                            loading={true}
                            disablePortal
                            id="Product"
                            size="small"
                            options={DataStock}
                            sx={{ width: 580 }}
                            onChange={HandleChange}
                            onInputChange={StockOnclose}
                            name="Product"
                            renderInput={(params) => <TextField {...params} label="Product" name="Product" />}
                        /></Col>
                    <Col md={6} sm={12} lg={6}>
                        <Autocomplete
                            fullWidth={true}
                            loading={true}
                            disablePortal
                            id="MaKho"
                            size="small"
                            options={DataWarehouse}
                            sx={{ width: 190 }}
                            onChange={HandleChange}
                            onInputChange={MaKhoOnclose}
                            name="MaKho"
                            renderInput={(params) => <TextField {...params} label="Ware House" name="Hang" />}
                        /></Col>
                </Row>
                <Row className='mb-2 row'>
                    <Col md={5} sm={5} lg={2}>
                        <Autocomplete
                            disablePortal
                            id="test"
                            fullWidth={true}
                            size="small"
                            options={DataCategory}
                            sx={{ width: 190 }}
                            onChange={HandleChange}
                            onInputChange={CategoryOnclose}
                            name={"ID"}
                            renderInput={
                                (params) => <TextField {...params}
                                    label="Category"
                                    name={"Category"}
                                />
                            }
                        /></Col>
                    <Col md={5} sm={5} lg={2}>
                        <Autocomplete
                            disablePortal
                            id="test"
                            fullWidth={true}
                            size="small"
                            options={DataBrand}
                            sx={{ width: 190 }}
                            onChange={HandleChange}
                            onInputChange={MaThuongHieuOnclose}
                            name={"ID"}
                            renderInput={
                                (params) => <TextField {...params}
                                    label="ID Brand"
                                    name={"Brand"}
                                />
                            }
                        /></Col>
                    <Col md={5} sm={5} lg={2}>
                        <Autocomplete
                            disablePortal
                            id="test"
                            fullWidth={true}
                            size="small"
                            options={Stockstatus}
                            sx={{ width: 190 }}
                            onChange={HandleChange}
                            onInputChange={TinhTrangHangOnclose}
                            name={"ID"}
                            renderInput={
                                (params) => <TextField {...params}
                                    label="Stock status"
                                    name={"Brand"}
                                />
                            }
                        /></Col>
                    <Col md={5} sm={5} lg={2}>
                        <ReactToPrint
                            trigger={() => {
                                return (<Button sx={{ width: 190 }} className='mb-3' variant='contained'>Print Invoice</Button>)
                            }}
                            content={() => componentRef.current}
                            documentTitle='Invoice'
                            pageStyle='print'
                        />
                    </Col>
                </Row>
            </Container>
            {/* <ButtonBottom pageindex={pageindex}
                    HandleButtonClick={HandleButtonClick} /> */}
            <div className='tablestyle' ref={componentRef}>
                <div><h3>Inventory Report</h3></div>
                <div>
                    <Row>
                        <Col md={2} sm={1} lg={2}>Category</Col>
                        <Col md={2} sm={1} lg={2}>: {formData.Category}</Col>
                    </Row>
                    <Row>
                        <Col md={2} sm={1} lg={2}>Brand</Col>
                        <Col md={2} sm={1} lg={2}>: {formData.MaThuongHieu}</Col>
                    </Row>
                    <Row>
                        <Col md={2} sm={1} lg={2}>Ware house</Col>
                        <Col md={2} sm={1} lg={2}>: {formData.MaKho}</Col>
                    </Row>
                    <Row>
                        <Col md={2} sm={1} lg={2}>Stock status</Col>
                        <Col md={2} sm={1} lg={2}>: {formData.TinhTrangHang}</Col>
                    </Row>
                </div>
                <TableInventory DataProduct={DataProduct} />
            </div>
        </>
    )
}
const ReportInventory = () => {
    return (
        <>
            <DataProvider />
        </>
    )
}
export default ReportInventory