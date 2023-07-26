import { useEffect, React, useState } from 'react'
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Request from "../../../api/Request";
import TableInventory from './table/TableInventory';
import Button from 'react-bootstrap/esm/Button';
// import ButtonBottom from '../../Import/buttonBot/buttonBottom';

const Month = [
    { data: 1, label: 'January' },
    { data: 2, label: 'February' },
    { data: 3, label: 'March' },
    { data: 4, label: 'April' },
    { data: 5, label: 'May' },
    { data: 6, label: 'June' },
    { data: 7, label: 'July' },
    { data: 8, label: 'August' },
    { data: 9, label: 'September' },
    { data: 10, label: 'October' },
    { data: 11, label: 'November' },
    { data: 12, label: 'December ' },
];
const Stockstatus = [
    { key: "Stockstatus", label: 'GOOD' },
    { key: "Stockstatus", label: 'BAD' },
    { key: "Stockstatus", label: 'CANCEL' }
];
const ReportInventory = () => {
    const [DataBrand, setDataBrand] = useState([])
    const [DataCategory, setDataCategory] = useState([])
    const [DataWarehouse, setDataWarehouse] = useState([]);
    const [DataProduct, setDataProduct] = useState([]) //state dataProduct
    const [formData, setFormData] = useState({
        MaThuongHieu: "",
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
            <Container fluid="xxl">
                <Row className='mb-2 row'>
                    <Col className="mb-3">
                        <h4>Report Inventory</h4>
                    </Col>
                </Row>
                <Row className='mb-2 row'>
                    <Col md={5} sm={5} lg={2}>
                        <Autocomplete
                            fullWidth={true}
                            loading={true}
                            disablePortal
                            id="MaKho"
                            size="small"
                            options={DataWarehouse}
                            sx={{ width: 180 }}
                            onChange={HandleChange}
                            onInputChange={MaKhoOnclose}
                            name="MaKho"
                            renderInput={(params) => <TextField {...params} label="Ware House" name="MaKho" />}
                        /></Col>
                    <Col md={5} sm={5} lg={2}>
                        <Autocomplete
                            disablePortal
                            id="test"
                            fullWidth={true}
                            size="small"
                            options={DataCategory}
                            sx={{ width: 180 }}
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
                            sx={{ width: 180 }}
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
                            sx={{ width: 180 }}
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
                            <Button>Print</Button>
                        </Col>
                </Row>

                <TableInventory DataProduct={DataProduct} />
                {/* <ButtonBottom pageindex={pageindex}
                    HandleButtonClick={HandleButtonClick} /> */}
            </Container>
        </>
    )
}

export default ReportInventory