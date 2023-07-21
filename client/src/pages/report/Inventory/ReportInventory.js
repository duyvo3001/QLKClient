import { useEffect, React, useState } from 'react'
// import { BarChart } from '@mui/x-charts/BarChart';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Request from "../../../api/Request";
import TableInventory from './table/TableInventory';
// import ButtonBottom from '../../Import/buttonBot/buttonBottom';


// const pData = [1000, 6000, 3000, 4780, 2890, 5390, 5390, 3000, 4780, 2890, 5390, 5390];

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
// const Day = [
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//     'Sunday'
// ]
// function WeeklyReport() {
//     return (
//         <BarChart
//             width={900}
//             height={400}
//             series={[
//                 { data: pData, label: '2020', id: 'pvId' },
//             ]}
//             xAxis={[{ data: Month, scaleType: 'band' }]}
//         />
//     );
// }
const ReportInventory = () => {
    const [getarrYear, setarrYear] = useState([])
    const [DataProduct, setDataProduct] = useState([]) //state dataProduct
    const [datayear, setdatayear] = useState(null)
    const [datamonth, setdatamonth] = useState(null)
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
        const _month = datamonth || 0
        Request
            .get(`/inventoryReport/${_year}/${_month}`,
                { headers: { Authorization: sessionStorage.getItem("access_token") } })
            .then((response) => { setDataProduct(response.data.result) })
            .catch((error) => { console.log(error) })

    }, [datayear, datamonth])

    const OnchangeYeartable = async (event, newvalue) => { // when click and when type change event
        setdatayear(newvalue.label)
    }

    const OnchangeMonthtable = async (event, newvalue) => { // when click and when type change event
        console.log(newvalue.data)
        setdatamonth(newvalue.data)
    }
    const OnCloseAuto = (event, newvalue) => {
        if (newvalue === "") {
            setdatamonth(0)
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
                    <Col md={2} sm={4} lg={2}>
                        <Autocomplete
                            disablePortal
                            id="test"
                            fullWidth={true}
                            size="medium"
                            options={getarrYear}
                            sx={{ width: 200 }}
                            defaultValue={{ label: "2023" }}
                            onChange={OnchangeYeartable}
                            name={"ID"}
                            renderInput={
                                (params) => <TextField {...params}
                                    label="Search year"
                                    name={"year"}
                                />
                            }
                        /></Col>
                    <Col md={2} sm={4} lg={2}>
                        <Autocomplete
                            disablePortal
                            id="test"
                            fullWidth={true}
                            size="medium"
                            options={Month}
                            sx={{ width: 200 }}
                            onChange={OnchangeMonthtable}
                            onInputChange={OnCloseAuto}

                            name={"ID"}
                            renderInput={
                                (params) => <TextField {...params}
                                    label="Search Month"
                                    name={"Month"}
                                />
                            }
                        /></Col>
                </Row>
                {/* <WeeklyReport /> */}
                <TableInventory DataProduct={DataProduct} />
                {/* <ButtonBottom pageindex={pageindex}
                    HandleButtonClick={HandleButtonClick} /> */}
            </Container>
        </>
    )
}

export default ReportInventory