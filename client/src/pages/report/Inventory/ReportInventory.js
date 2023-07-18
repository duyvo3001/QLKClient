import { useEffect, React, useState } from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Request from "../../../api/Request";

const pData = [1000, 6000, 3000, 4780, 2890, 5390, 5390];
const Month = [
    'January',
    'February',
    'March',
    'April',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December ',
];
const Day = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
]
function WeeklyReport() {
    return (
        <BarChart
            width={900}
            height={400}
            series={[
                { data: pData, label: 'Import', id: 'pvId' },
            ]}
            xAxis={[{ data: Day, scaleType: 'band' }]}
        />
    );
}
const ReportInventory = () => {
    const [DataProduct, setDataProduct] = useState([]) //state dataProduct
    const [searchBox, setsearchBox] = useState([]) //state dataProduct
    function RequestRouterSearch(Url, keyName, SetData) {
        Request
            .get(`/${Url}`,
                { headers: { Authorization: sessionStorage.getItem("access_token") } })
            .then((response) => {
                const object = []
                if (Url === "SearchStock") {
                    response?.data?.result?.map((key, index) => {
                        return object.push(
                            {
                                index,
                                label: key?.[keyName],
                                key: keyName,
                                _id: key._id,
                                MaLK: key.MaLK,
                                Color: key.Color,
                                Donvi: key.Donvi,
                                MaNCC: key.MaNCC,
                                MaThuongHieu: key.MaThuongHieu,
                                TinhTrangHang: key.TinhTrangHang,
                                GiaBanLe: key?.GiaBanLe,
                                Soluong: key?.Soluong,
                                TenLK: key?.TenLK,
                                NgayNhap: key?.NgayNhap
                            }
                        )
                    })
                }
                else {
                    response?.data?.result?.map((key) => {
                        return object.push({ label: key?.[keyName], key: keyName })
                    })
                }
                SetData(object)
            })
            .catch((error) => { console.log(error) })
    }

    useEffect(() => {
        RequestRouterSearch("SearchStock", "MaLK", setDataProduct)
    }, [])

    const Onchangeformtable = async (event, newvalue) => { // when click and when type change event
        if (newvalue) {// click event
            // console.log(newvalue)
            setsearchBox([newvalue])
        }
    }
    const OnCloseAuto = (event, newvalue) => {
        if (newvalue === "") {
            setsearchBox([])
        }
    }
    const top100Films = [
        { label: 'January', },
        { label: 'February', },
        { label: 'March', },
        { label: 'April', },
        { label: 'June', },
        { label: 'July', },
        { label: 'August', },
        { label: 'September', },
        { label: 'October', },
        { label: 'November', },
        { label: 'December', },
    ];
    return (
        <>
            <Container fluid="xxl">
                <Row className='mb-2 row'>
                    <Col className="mb-3">
                        <h4>Report Inventory</h4>
                    </Col>
                </Row>
                <Row className='mb-2 row'>
                    <Col md={2} sm={4} lg={2}>
                        <Autocomplete
                            disablePortal
                            id="test"
                            fullWidth={true}
                            size="small"
                            options={DataProduct}
                            sx={{ width: 200 }}
                            onChange={Onchangeformtable}
                            onInputChange={OnCloseAuto}
                            name={"ID"}
                            renderInput={
                                (params) => <TextField {...params}
                                    label="Search product"
                                    name={"Product"}
                                />
                            }
                        /></Col>
                    {/* <Col md={2} sm={4} lg={2}>
                        <Autocomplete
                            la
                            disablePortal
                            fullWidth={true}
                            id="MaThuongHieu"
                            size="small"
                            options={top100Films}
                            sx={{ width: 150 }}
                            name="MaThuongHieu"
                            renderInput={(params) => <TextField {...params} label="Month" name="MaThuongHieu" />}
                        /></Col>
                     <Col md={2} sm={4} lg={2}>
                        <Autocomplete
                            la
                            disablePortal
                            fullWidth={true}
                            id="MaThuongHieu"
                            size="small"
                            options={top100Films}
                            sx={{ width: 150 }}
                            name="MaThuongHieu"
                            renderInput={(params) => <TextField {...params} label="Month" name="MaThuongHieu" />}
                        /></Col> */}
                </Row>

                <Row >
                </Row>
                <WeeklyReport />
            </Container>
        </>
    )
}

export default ReportInventory