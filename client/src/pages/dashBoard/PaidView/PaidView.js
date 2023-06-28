import { React, useState } from 'react'
import ButtonBottom from "../../Import/buttonBot/buttonBottom";
import OrderTableView from "../../PaidOrder/OrderTableView";
import Button from 'react-bootstrap/Button';
import { MdManageAccounts } from 'react-icons/md';

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
            <h4 >Manage : Paid Order</h4>
            <Button className="mb-3" variant="info" href="/PaidOrderPage"><MdManageAccounts/></Button>
            <OrderTableView className="mb-3" filters={filters} setfilters={setfilters} />

            <ButtonBottom
                pageindex={pageindex}
                HandleButtonClick={HandleButtonClick}
            />
        </>
    )
}

export default PaidView