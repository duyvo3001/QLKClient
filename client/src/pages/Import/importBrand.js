import { tableDTBrand as TableDT } from "./table/tableDTBrand";
import { React, useState } from "react";
import Container from "react-bootstrap/Container";
import RowCol from "./RowCol";
import ButtonSubmit from "./ButtonSubmit";
import Form from "react-bootstrap/Form";
import Request from "../../api/Request.js";
import ButtonBottom from  '../Import/buttonBot/buttonBottom'


const ImportBrand = () => {
    const [pageindex, setpageindex] = useState({
        page: 1,
    });
    const [filters, setfilters] = useState({
        page: 1,
    });
    const [formData, setFormData] = useState({});

    const HandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const HandleData = () => {
        Request.post(
            "/PostBrand",
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
            <h5>Import : Brand</h5>
            <Form onSubmit={HandleData}>
                <RowCol
                    handle={HandleChange}
                    text1="ID Brand"
                    ID1="MaThuongHieu"
                    text2="Name Brand"
                    ID2="TenThuongHieu"
                />
                <ButtonSubmit />
            </Form>
            <TableDT  filters={filters} setfilters={setfilters}/>
            <ButtonBottom  pageindex={pageindex} HandleButtonClick={HandleButtonClick}/>
        </Container>
    );
};

export default ImportBrand;
