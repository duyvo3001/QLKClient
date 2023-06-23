import { React, useState } from 'react'
import ButtonBottom from "../../Import/buttonBot/buttonBottom";
import OrderTableView from "../../PaidOrder/OrderTableView";
import Button from 'react-bootstrap/Button';
const PaidView = () => {
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
    return (
        <>
            <h4>Manage : Paid Order</h4>
            <Button variant="secondary" href="/PaidOrderPage">Mange</Button>
            <OrderTableView filters={filters} setfilters={setfilters} />

            <ButtonBottom
                pageindex={pageindex}
                HandleButtonClick={HandleButtonClick}
            />
        </>
    )
}

export default PaidView