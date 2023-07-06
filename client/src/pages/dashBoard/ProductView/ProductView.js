import { React, useState } from "react";
import { TableDT } from "../../Import/table/tableDTStock"
import ButtonBottom from "../../Import/buttonBot/buttonBottom";
import Button from 'react-bootstrap/Button';
import { MdManageAccounts } from 'react-icons/md';
const ProductView = () => {
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
            <h4>Manage: Product</h4>
            <Button className="mb-3" variant="info" href="/ImportStock"><MdManageAccounts/></Button>
            <TableDT className="mb-3" filters={filters} valuehidden={false} setfilters={setfilters} />
            <ButtonBottom
                pageindex={pageindex}
                HandleButtonClick={HandleButtonClick}
            />
        </>
    )
}

export default ProductView