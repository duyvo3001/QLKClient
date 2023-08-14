import { useEffect, React, useState, useRef } from 'react'
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ReactToPrint from 'react-to-print';
import Request from "../../../../api/Request";
import TableInventory from '../table/TableInventory';
import Button from 'react-bootstrap/esm/Button';
// import ButtonBottom from '../../Import/buttonBot/buttonBottom';
import { useNavigate } from 'react-router-dom';
// import SetData ,{DataContext} from '../../set_formData/SetData';
import PrintReportInventory from '../print/PrintReportInventory';

const DataProvider = () => {
    // const context = useContext(DataContext);
    // console.info(context)
    const navigate = useNavigate();
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
        console.log(formData)
        // context?.Setformdatafunc(formData)

    }, [formData])

    const HandleChange = (event, newvalue) => {
        console.log(newvalue)
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
    const NavigatepagePrint = (event) => {
        navigate('/PrintInventory')
    }
    return (
        <>
            <Container>
                <Row className='mb-2 row'>
                    <Col className="mb-3">
                        <h4>Inventory Report</h4>
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
                            sx={{ width: 500 }}
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
                                return (<Button className='mb-3' variant='success'>Print Invoice</Button>)
                            }}
                            content={() => componentRef.current}
                            documentTitle='Invoice'
                            pageStyle='print'
                        />
                    </Col>
                </Row>
                {/* <ButtonBottom pageindex={pageindex}
                    HandleButtonClick={HandleButtonClick} /> */}
            </Container>
            <div ref={componentRef}>
                <div><h3>Inventory Report</h3></div>
                <div>
                    <Row>
                        <Col md={2} lg={2}>Category</Col>
                        <Col>{formData.Category}</Col>
                    </Row>                <Row>
                        <Col md={2} lg={2}>Brand</Col>
                        <Col>{formData.MaThuongHieu}</Col>
                    </Row>
                    <Row>
                        <Col md={2} lg={2}>Ware house</Col>
                        <Col>{formData.MaKho}</Col>
                    </Row>
                    <Row>
                        <Col md={2} lg={2}>Stock status</Col>
                        <Col>{formData.TinhTrangHang}</Col>
                    </Row>
                </div>
                <TableInventory DataProduct={DataProduct} />
            </div>
        </>
    )
}
const ReportInventory = () => {
    return (
        // <SetData>
        <>
            <DataProvider />
            {/* <PrintReportInventory hidden={false} /> */}
        </>
        // </SetData>
    )
}
export default ReportInventory