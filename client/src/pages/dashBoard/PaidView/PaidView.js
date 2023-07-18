import { React, useState, useEffect } from 'react'
import ButtonBottom from "../../Import/buttonBot/buttonBottom";
import OrderTableView from "../../PaidOrder/OrderTableView";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Request from "../../../api/Request";

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
                                Discount: key.Discount,
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
            <h4 >Manage : Paid Order</h4>
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
                            name={"Brand"}
                        />
                    }
                />
            </div>
            <OrderTableView className="mb-3" searchBox={searchBox} filters={filters} setfilters={setfilters} />
            <ButtonBottom
                pageindex={pageindex}
                HandleButtonClick={HandleButtonClick}
            />
        </>
    )
}

export default PaidView