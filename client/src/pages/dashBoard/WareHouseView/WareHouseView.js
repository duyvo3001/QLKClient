import { React, useState } from "react";
import { TableWareHouse } from "../../warehouse/TableWareHouse";
import ButtonBottom from "../../Import/buttonBot/buttonBottom";
import { MdManageAccounts } from 'react-icons/md';
import Button from "react-bootstrap/esm/Button";
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
                <h4>Manage: WareHouse</h4>
                <Button className="mb-3" href="ImportWareHouse" variant="info"><MdManageAccounts/></Button>
                <TableWareHouse className="mb-3" filters={filters} setfilters={setfilters} />
                <ButtonBottom
                    pageindex={pageindex}
                    HandleButtonClick={HandleButtonClick}
                />
            </>
            )
}

            export default WareHouseView