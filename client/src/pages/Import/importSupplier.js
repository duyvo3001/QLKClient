import { tableDTSupplier as TableDT } from "./table/tableDTSupplier";
import { React, useState } from "react";
import Container from "react-bootstrap/Container";
import RowCol from "./RowCol";
import RowCol1 from "./RowColOne";
import Form from "react-bootstrap/Form";
import Request from "../../api/Request.js";
import ButtonSubmit from "./ButtonSubmit";
import ButtonBottom from "../Import/buttonBot/buttonBottom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
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
            <h4 className="mb-3">Import : Supplier</h4>
            <Form onSubmit={HandleData}>
                <RowCol
                    handle={HandleChange}
                    text1="ID Supplier"
                    ID1="MaNCC"
                    text2="Name Supplier"
                    ID2="TenNCC"
                />
                <Row className='mb-2 row'>
                    <Col md={2}><Form.Label column="sm">Address</Form.Label></Col>
                    <Col md={4}><Form.Control onChange={HandleChange} size="sm" as="textarea" type="text" name="DiaChi" /></Col>
                    <Col md={2}><Form.Label column="sm">Phone</Form.Label></Col>
                    <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="number" name="SDT" /></Col>
                </Row>
                <Row className='mb-2 row'>
                    <Col md={2}><Form.Label column="sm">Email</Form.Label></Col>
                    <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="email" name="Email" /></Col>
                </Row>
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
