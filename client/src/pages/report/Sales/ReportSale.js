import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';

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
const ReportSale = () => {
    return (
        <>
            <SimpleBarChart />
            <div>ReportSale</div>
        </>
    )
}

export default ReportSale