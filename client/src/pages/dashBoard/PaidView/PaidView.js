import { React, useState, useEffect } from 'react'
import ButtonBottom from "../../Import/buttonBot/buttonBottom";
import OrderTableView from "../../PaidOrder/OrderTableView";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Request from "../../../api/Request";
import Container from '@mui/material/Container';
import { Grid } from "@mui/material";
import "../../../style/styleTable.scss"
const PaidView = () => {
    const [DataPaidOrder, setDataPaidOrder] = useState([]) //state dataProduct
    const [searchBox, setsearchBox] = useState([]) //state dataProduct
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
    function RequestRouterSearch(Url, keyName, SetData) {
        Request
            .get(`/${Url}`,
                { headers: { Authorization: sessionStorage.getItem("access_token") } })
            .then((response) => {
                const object = []
                if (Url === "SearchInvoice") {
                    response?.data?.result?.map((key, index) => {
                        return object.push(
                            {
                                index,
                                label: key?.[keyName],
                                key: keyName,
                                _id: key._id,
                                IDPaidOrder: key.IDPaidOrder,
                                IDCustomer: key.IDCustomer,
                                Product: key.Product,
                                Date: key?.Date
                            }
                        )
                    })
                }
                else {
                    response?.data?.result?.map((key) => {
                        return object.push({ label: key?.[keyName], key: keyName })
                    })
                }
                SetData(object)
            })
            .catch((error) => { console.log(error) })
    }
    useEffect(() => {
        RequestRouterSearch("SearchInvoice", "IDPaidOrder", setDataPaidOrder)
    }, [])
    const Onchangeformtable = async (event, newvalue) => { // when click and when type change event
        if (newvalue) // click event
            setsearchBox([newvalue])
    }
    const OnCloseAuto = (event, newvalue) => {
        if (newvalue === "")
            setsearchBox([])
    }
    return (
        <>
            <Container fixed>
                <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={3} sm={3} md={3} className="mb-3">
                        <h4 >Manage : Export Order</h4>
                    </Grid>
                    <Grid className="content-wrapper" item xs={3} sm={3} md={3}>

                        <div className="mb-3">
                            <Autocomplete
                                disablePortal
                                id="test"
                                fullWidth={true}
                                size="small"
                                options={DataPaidOrder}
                                sx={{ width: 200 }}
                                onChange={Onchangeformtable}
                                onInputChange={OnCloseAuto}
                                name={"ID"}
                                renderInput={
                                    (params) => <TextField {...params}
                                        label="Search"
                                        name={"ExportOrder"}
                                    />
                                }
                            />
                        </div>
                    </Grid>
                </Grid>
            </Container >
            <div className="content-table">
            <OrderTableView className="mb-3" searchBox={searchBox} filters={filters} setfilters={setfilters} />
            <ButtonBottom
                pageindex={pageindex}
                HandleButtonClick={HandleButtonClick}
                />
                </div>
        </>
    )
}

export default PaidView