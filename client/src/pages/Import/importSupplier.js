import { tableDTSupplier as TableDT } from "./table/tableDTSupplier";
import { React, useState } from "react";
import Container from "react-bootstrap/Container";
import RowCol from "./RowCol";
import RowCol1 from "./RowColOne";
import Form from "react-bootstrap/Form";
import Request from "../../api/Request.js";
import ButtonSubmit from "./ButtonSubmit";
import ButtonBottom from "../Import/buttonBot/buttonBottom";

const ImportSupplier = () => {
    const [formData, setFormData] = useState({});
    const [pageindex, setpageindex] = useState({
        page: 1,
    });
    const [filters, setfilters] = useState({
        page: 1,
    });
    const HandleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        setFormData({ ...formData, [name]: value });
    };

    const HandleData = () => {
        console.log(formData);
        Request.post(
            "/PostSupplier",
            { formData },
            { headers: { Authorization: sessionStorage.getItem("access_token") } }
        ).catch((error) => {
            console.log(error);
        });
    };
    const HandleButtonClick = (newPage) => {
        setfilters({
            ...filters,
            page: newPage,
        });
        setpageindex({ ...pageindex, page: newPage });
    };
    return (
        <Container>
            <h5>Import : Supplier</h5>
            <Form onSubmit={HandleData}>
                <RowCol
                    handle={HandleChange}
                    text1="ID Supplier"
                    ID1="MaNCC"
                    text2="Name Supplier"
                    ID2="TenNCC"
                />
                <RowCol
                    handle={HandleChange}
                    text1="Address"
                    ID1="DiaChi"
                    text2="Phone"
                    ID2="SDT"
                />
                <RowCol1 handle={HandleChange} text1="Email" ID1="Email" />
                <ButtonSubmit />
            </Form>
            <TableDT filters={filters} setfilters={setfilters} />
            <ButtonBottom
                HandleButtonClick={HandleButtonClick}
                pageindex={pageindex}
            />
        </Container>
    );
};

export default ImportSupplier;
