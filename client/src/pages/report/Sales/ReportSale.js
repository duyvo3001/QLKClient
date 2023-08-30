import { useEffect, React, useState } from 'react'
// import { BarChart } from '@mui/x-charts/BarChart';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Request from "../../../api/Request";
import { BarChart } from '@mui/x-charts/BarChart';
import { Grid } from '@mui/material';
const ReportSale = () => {

    const [getarrYear, setarrYear] = useState([])
    const [datayear, setdatayear] = useState(null)
    const [uData, setuData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [uDataCategory, setuDataCategory] = useState([0])
    const [uDataBrand, setuDataBrand] = useState([0])
    const xLabels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December ',
    ];
    const [xLabelsCategory, setxLabelsCategory] = useState(["onload"])
    const [xLabelsBrand, setxLabelsBrand] = useState(["onload"])

    const YearSaleBarChart = () => {
        return (
            <BarChart
                width={900}
                height={200}
                series={[
                    { data: uData, label: 'Export', id: 'uvId' },
                ]}
                xAxis={[{ data: xLabels, scaleType: 'band' }]}
            />
        );
    }
    const CategoryBarChart = () => {
        return (
            <BarChart
                width={900}
                height={200}
                series={[
                    { data: uDataCategory, label: 'Category', id: 'uvId' },
                ]}
                xAxis={[{ data: xLabelsCategory, scaleType: 'band' }]}
            />
        );
    }
    const BrandBarChart = () => {
        return (
            <BarChart
                width={900}
                height={200}
                series={[
                    { data: uDataBrand, label: 'Brand', id: 'uvId' },
                ]}
                xAxis={[{ data: xLabelsBrand, scaleType: 'band' }]}
            />
        );
    }
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
            .get(`/SaleReport/${_year}`,
                { headers: { Authorization: sessionStorage.getItem("access_token") } })
            .then((response) => {
                setuData(response.data.uData)
            })
            .catch((error) => { console.log(error) })
        Request
            .get(`/CategoryReport/${_year}`,
                { headers: { Authorization: sessionStorage.getItem("access_token") } })
            .then((response) => {
                setuDataCategory(response.data.uDataCategory)
                setxLabelsCategory(response.data.labelCategory)
            })
            .catch((error) => { console.log(error) })
        Request
            .get(`/BrandReport/${_year}`,
                { headers: { Authorization: sessionStorage.getItem("access_token") } })
            .then((response) => {
                setuDataBrand(response.data.uDataBrand)
                setxLabelsBrand(response.data.labelBrand)
            })
            .catch((error) => { console.log(error) })

    }, [datayear])

    const OnchangeYeartable = async (event, newvalue) => { // when click and when type change event
        setdatayear(newvalue.label)
    }

    return (
        <>
            <Container>
                <Row className='mb-2 row'>
                    <Col md={2}>
                        <h4>Report Export</h4>
                    </Col>
                    <Col md={2}>
                        <Autocomplete
                            disablePortal
                            id="test"
                            fullWidth={true}
                            size="small"
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
                </Row>
            </Container>
            <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid>
                    <div className='auto'>
                        <YearSaleBarChart />
                    </div>
                </Grid>
                <Grid>
                    <div className='auto'>
                        <CategoryBarChart />
                    </div>
                </Grid>
                <Grid>
                    <div className='auto'>
                        <BrandBarChart />
                    </div>
                </Grid>
            </Grid>
            {/* <TableSale DataInvoice={DataInvoice} /> */}
        </>
    )
}

export default ReportSale