import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

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
                {/* <Row className='mb-2 row'>
                    <Col md={2}>
                        <Button variant="Solid" color="danger">Weekly report</Button>        
                    </Col>
                    <Col md={2}>                   
                        <Button variant="Solid" color="primary">Month report</Button>
                    </Col>
                    <Col md={2}>
                        <Button variant="Solid" color="primary">Annual report </Button>
                    </Col>
                </Row> */}
                {/* <Row className='mb-2 row'>
                    <Col md={2} sm={4} lg={2}>
                        <Autocomplete
                            la
                            disablePortal
                            fullWidth={true}
                            id="MaThuongHieu"
                            size="small"
                            options={top100Films}
                            sx={{ width: 170 }}
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
                        /></Col>
                </Row> */}

                <Row >
                </Row>
                <WeeklyReport />
            </Container>
        </>
    )
}

export default ReportInventory