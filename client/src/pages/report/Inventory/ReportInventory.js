import { useEffect, React, useState } from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Request from "../../../api/Request";
import TableInventory from './table/TableInventory';
import ButtonBottom from '../../Import/buttonBot/buttonBottom';


const pData = [1000, 6000, 3000, 4780, 2890, 5390, 5390, 3000, 4780, 2890, 5390, 5390];

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
                { data: pData, label: '2020', id: 'pvId' },
            ]}
            xAxis={[{ data: Month, scaleType: 'band' }]}
        />
    );
}
const ReportInventory = () => {
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
    const [getarrYear, setarrYear] = useState([])
    const [DataProduct, setDataProduct] = useState([]) //state dataProduct
    const [datayear, setdatayear] = useState(null)
    const getYearAutocomplete = () => {
        const currentYear = new Date().getFullYear();
        const Year2002 = 2020
        let arrYear = []
        for (let i = Year2002; i <= currentYear; i++) {
            arrYear.push({ label: i.toString() });
        }
        setarrYear(arrYear)
    }
    useEffect(() => {
        getYearAutocomplete()
    }, [])
    useEffect(() => {
        const _year = datayear || new Date().getFullYear()
        Request
            .get(`/inventoryReport/${_year}`,
                { headers: { Authorization: sessionStorage.getItem("access_token") } })
            .then((response) => { setDataProduct(response.data.result) })
            .catch((error) => { console.log(error) })

    }, [datayear])

    const Onchangeformtable = async (event, newvalue) => { // when click and when type change event
        setdatayear(newvalue.label)
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
                    <Col md={2} sm={4} lg={2}>
                        <Autocomplete
                            disablePortal
                            id="test"
                            fullWidth={true}
                            size="small"
                            options={getarrYear}
                            sx={{ width: 200 }}
                            onChange={Onchangeformtable}
                            name={"ID"}
                            renderInput={
                                (params) => <TextField {...params}
                                    label="Search year"
                                    name={"year"}
                                />
                            }
                        /></Col>
                </Row>
                <WeeklyReport />
                <TableInventory DataProduct={DataProduct} />
                <ButtonBottom pageindex={pageindex}
                    HandleButtonClick={HandleButtonClick} />
            </Container>
        </>
    )
}

export default ReportInventory