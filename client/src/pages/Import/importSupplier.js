import { tableDTSupplier as TableDT } from "./table/tableDTSupplier";
import { AlterShowSuccess, AlterShowEror } from "../../components/Alter/AlterShow";
import { React, useState ,useEffect } from "react";
import Container from "react-bootstrap/Container";
import RowCol from "./RowCol";
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

    const [Show, setShow] = useState({
        valueShow: false,
        message: ""
    });
    const [ShowEror, setShowEror] = useState({
        valueShow: false,
        message: ""
    });

    const HandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const HandleData = (event) => {
        event.preventDefault();
        Request
            .post(
                "/PostSupplier",
                { formData },
                { headers: { Authorization: sessionStorage.getItem("access_token") } }
            )
            .then((response) => {
                if (response.status === 200) {
                    let text = document.getElementsByName("MaNCC")
                    let text1 = document.getElementsByName("TenNCC")
                    let text2 = document.getElementsByName("DiaChi")
                    let text3 = document.getElementsByName("SDT")
                    let text4 = document.getElementsByName("Email")
                    text[0].value = ""
                    text1[0].value = ""
                    text2[0].value = ""
                    text3[0].value = ""
                    text4[0].value = ""

                    setFormData({})

                    setShow({
                        valueShow: true,
                        message: response.data.message
                    })
                }
                else {
                    setShowEror({
                        valueShow: true,
                        message: response.data.message
                    })
                }
            }
            )
            .catch((error) => {
                if (error.response.status === 500) {
                    setShowEror({
                        valueShow: true,
                        message: error.response.data.message
                    })
                }
            });
    };
    const HandleButtonClick = (newPage) => {
        setfilters({
            ...filters,
            page: newPage,
        });
        setpageindex({ ...pageindex, page: newPage });
    };

    useEffect(() => {// Render table when Import
        setfilters({
            page: 1,
        })
    }, [Show, ShowEror])

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
            <AlterShowEror ShowEror={ShowEror} setShowEror={setShowEror} />
            <AlterShowSuccess Show={Show} setShow={setShow} />
            <TableDT filters={filters} />
            <ButtonBottom
                HandleButtonClick={HandleButtonClick}
                pageindex={pageindex}
            />
        </Container>
    );
};

export default ImportSupplier;
