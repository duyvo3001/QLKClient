import { React, useState } from "react";
import { TableWareHouse } from "../../warehouse/TableWareHouse";
import ButtonBottom from "../../Import/buttonBot/buttonBottom";

const WareHouseView = () => {
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
            <h4>Mange : WareHouse</h4>
            <TableWareHouse filters={filters} setfilters={setfilters} />
            <ButtonBottom
                pageindex={pageindex}
                HandleButtonClick={HandleButtonClick}
            />
        </>
    )
}

export default WareHouseView