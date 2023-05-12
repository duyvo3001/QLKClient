import { React, useState } from "react";
import { TableDT } from "../../Import/table/tableDTStock"
import ButtonBottom from "../../Import/buttonBot/buttonBottom";
import Button from 'react-bootstrap/Button';

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
            <h4>Mange : Product</h4>
            <Button variant="secondary" href="/ImportStock">Mange</Button>
            <TableDT filters={filters} setfilters={setfilters} />
            <ButtonBottom
                pageindex={pageindex}
                HandleButtonClick={HandleButtonClick}
            />
        </>
    )
}

export default ProductView