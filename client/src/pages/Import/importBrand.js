import { tableDTBrand as TableDT } from "./table/tableDTBrand";
import { React, useEffect, useState } from "react";
import { AlterShowSuccess, AlterShowEror } from "../../components/Alter/AlterShow";
import Container from "react-bootstrap/Container";
import RowColOne from "./RowColOne";
import ButtonSubmit from "./ButtonSubmit";
import Form from "react-bootstrap/Form";
import Request from "../../api/Request.js";
import ButtonBottom from '../Import/buttonBot/buttonBottom'
import {Button} from "@mui/material"
const ImportBrand = () => {
    const [pageindex, setpageindex] = useState({
        page: 1,
    });
    const [filters, setfilters] = useState({
        page: 1,
    });
    const [formData, setFormData] = useState({MaThuongHieu:""});
    const [disabledbtn, setdisabledbtn] = useState(true)
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
                "/PostBrand",
                { formData },
                { headers: { Authorization: sessionStorage.getItem("access_token") } }
            )
            .then((response) => {
                if (response.status === 200) {

                    let text = document.getElementsByName("MaThuongHieu")
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

    useEffect(()=>{
        if(formData.MaThuongHieu !== "") setdisabledbtn(false)
    },[formData])
    return (
        <Container>
            <h4 className="mb-3">Import : Brand</h4>
            <Form>
                <RowColOne
                    handle={HandleChange}
                    text1="ID Brand"
                    ID1="MaThuongHieu"
                />
                <Button onClick={HandleData} variant="contained" disabled={disabledbtn}>Add Brand</Button>
            </Form>
            <AlterShowEror ShowEror={ShowEror} setShowEror={setShowEror} />
            <AlterShowSuccess Show={Show} setShow={setShow} />
            <TableDT filters={filters} valuehidden={true} />
            <ButtonBottom pageindex={pageindex} HandleButtonClick={HandleButtonClick} />
        </Container>
    );
};

export default ImportBrand;
