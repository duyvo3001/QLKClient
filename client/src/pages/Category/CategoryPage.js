import { React, useEffect, useState } from "react";
import { AlterShowEror, AlterShowSuccess } from "../../components/Alter/AlterShow";
import { CategoryTable } from "./table/CategoryTable"
import ButtonBottom from "../Import/buttonBot/buttonBottom";
import RowCol1 from "../Import/RowColOne";
import Form from "react-bootstrap/Form";
import Request from "../../api/Request";
import Container from "react-bootstrap/Container";
import { Button } from "@mui/material";

const CategoryPage = () => {
    const [pageindex, setpageindex] = useState({
        page: 1,
    });
    const [filters, setfilters] = useState({
        page: 1,
    });
    const [formData, setFormData] = useState({
        IDcategory: ""
    });
    const [disabledbtn, setdisabledbtn] = useState(true);
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
        setFormData({ ...formData, [name]: value?.trim() });
    };

    const HandleData = (event) => {
        event.preventDefault();
        Request
            .post(
                "/importCategory",
                { formData },
                { headers: { Authorization: sessionStorage.getItem("access_token") } }
            )
            .then((response) => {
                if (response.status === 200) {
                    let text = document.getElementsByName("IDcategory")
                    text[0].value = ""
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
        setfilters({ ...filters, page: newPage, });
        setpageindex({ ...pageindex, page: newPage });
    };

    useEffect(() => {// Render table when Import
        setfilters({
            page: 1,
        })
    }, [Show, ShowEror])

    useEffect(() => {
        if (formData.IDcategory !== "") setdisabledbtn(false)
    },[formData])

    return (
        <Container>
            <h4 className="mb-3">Import : Category</h4>
            <Form onSubmit={HandleData}>
                <RowCol1
                    handle={HandleChange}
                    text1="ID Category"
                    ID1="IDcategory"
                />
                <Button variant="contained" color="success" disabled={disabledbtn} >Add Category</Button>
            </Form>
            <AlterShowEror ShowEror={ShowEror} setShowEror={setShowEror} />
            <AlterShowSuccess Show={Show} setShow={setShow} />
            <CategoryTable filters={filters} valuehidden={false} />
            <ButtonBottom pageindex={pageindex} HandleButtonClick={HandleButtonClick} />
        </Container>
    );
}

export default CategoryPage