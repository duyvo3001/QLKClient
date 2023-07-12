import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 3490, 3490, 3490, 3490, 3490];
const pData = [1000, 6000, 3000, 4780, 2890, 5390, 1490, 3490, 3490, 3490, 3490, 12490];
const xLabels = [
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
function SimpleBarChart() {
    return (
        <BarChart
            width={900}
            height={400}
            series={[
                { data: pData, label: 'Import', id: 'pvId' },
                { data: uData, label: 'Sales', id: 'uvId' },
            ]}
            xAxis={[{ data: xLabels, scaleType: 'band' }]}
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
                <Row className='mb-2 row'>
                    <Col md={2}>
                        <Button variant="Solid" color="danger">Weekly report</Button>        
                    </Col>
                    <Col md={2}>                   
                        <Button variant="Solid" color="primary">Month report</Button>
                    </Col>
                    <Col md={2}>
                        <Button variant="Solid" color="primary">Annual report </Button>
                    </Col>
                </Row>
                <Row className='mb-2 row'>
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
                </Row>

                <Row className='mb-2 row'>
                    <SimpleBarChart />
                </Row>
            </Container>
        </>
    )
}

export default ReportInventory