import { React, useState } from "react";
import ButtonBottom from "../../Import/buttonBot/buttonBottom";
import TableUser from "../../Import/table/TableUser"
import Button from "react-bootstrap/esm/Button";
const UserView = () => {
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
            <h4>Manage : User</h4>
            <Button variant="secondary" href="/userPage">Manage</Button>
            <TableUser filters={filters} setfilters={setfilters} />
            <ButtonBottom
                pageindex={pageindex}
                HandleButtonClick={HandleButtonClick}
            />
        </>
    )
}

export default UserView