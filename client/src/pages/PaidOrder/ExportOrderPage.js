import { React, useState, useEffect, createContext } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import ExportOrderTable from './ExportOrderTable';
import Request from '../../api/Request';
import Alert from 'react-bootstrap/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export const DataOnchange = createContext(null);
const ExportOrderPage = () => {

    const [Paid, setPaid] = useState({
        CreateOrder: false,
        Print: true
    })
    const [getID, setID] = useState(null)
    const [DataCustomer, setDataCustomer] = useState([]) //state.dataCustomer
    const [DataProduct, setDataProduct] = useState([]) //state.dataProduct
    const [formData, setFormData] = useState({}) //state formdata to request server
    const [show, setShow] = useState({
        valueShow: false,
        message: ""
    });
    const [success, setSuccess] = useState({
        valueShow: false,
        message: ""
    });
    const [Render, setRender] = useState([// Render table , chuyen qua table
        {
            ID: 1,
            NameProduct: "",
            Qty: 0,
            MaxQty: 0
        }
    ])

    const Onchangeform = (event, newvalue) => { //get value onchange
        if (newvalue) {
            setFormData({ ...formData, [newvalue?.key]: newvalue?.label });
        }
        else {
            const { name, value } = event.target;
            setFormData({ ...formData, [name]: value });
        }
    }
    const AlertPaidOrderSuccess = () => {
        if (success?.valueShow === true) {
            return (
                <Alert variant="success" onClose={() => setSuccess({
                    valueShow: false,
                    message: ""
                })} dismissible>
                    {
                        success?.message
                    }
                </Alert>
            );
        }
    }
    const AlertDismissible = () => {
        if (show?.valueShow === true) {
            return (
                <Alert variant="danger" onClose={() => setShow({
                    valueShow: false,
                    message: ""
                })} dismissible>
                    {
                        show?.message
                    }
                </Alert>
            );
        }
    }

    function updateData(Url, response, keyName, SetData) {
        const object = []
        if (Url === "SearchStockExport") {
            response?.data?.result?.map((key, index) => {
                return object.push(
                    {
                        index,
                        label: key?.[keyName],
                        key: keyName,
                        GiaBanLe: key?.GiaBanLe,
                        Soluong: key?.Soluong,
                        TenLK: key?.TenLK
                    }
                )
            })
        }
        else {
            response?.data?.result?.map((key) => {
                return object.push({
                    label: key?.[keyName],
                    key: keyName,
                    name: key.NameCustomer
                })
            })
        }
        SetData(object)
    }

    function RequestRouterSearch(Url, keyName, SetData) {
        Request
            .get(`/${Url}`,
                { headers: { Authorization: sessionStorage.getItem("access_token") } })
            .then((response) => {
                updateData(Url, response, keyName, SetData)
            })
            .catch((error) => { console.log(error) })
    }

    useEffect(() => {
        RequestRouterSearch("SearchStockExport", "MaLK", setDataProduct)
        RequestRouterSearch("SearchCustomer", "IDCustomer", setDataCustomer)
    }, [])

    function PaidOrder() {
        let checkErr = true;
        const searchCustomer = document.getElementsByName("IDCustomer") // check customer

        if (!searchCustomer[0]) {
            setShow({
                valueShow: true,
                message: "don't empty the Customer ID"
            })
            checkErr = false
        }

        // eslint-disable-next-line array-callback-return
        const checkfunc = checkemptyNameProduct(checkErr)

        if (checkfunc === true) {
            requestPaidOrder()
        }
    }

    function requestPaidOrder() {
        Request.post('/PaidOrder',
            {
                formData, Render
            },
            {
                headers: { 'Authorization': sessionStorage.getItem("access_token") }
            })
            .then(response => {
                if (response.status === 200) {
                    const inputFields = [
                        'searchCustomer',
                        'search1',
                        'Quantity1',
                    ];
                    inputFields.forEach((fieldName) => {
                        const elements = document.getElementsByName(fieldName);
                        if (elements.length > 0) {
                            elements[0].value = "";
                        }
                    });
                    setFormData({})
                    setSuccess({
                        valueShow: true,
                        message: response.data.message
                    })
                    setPaid({
                        CreateOrder: true,
                        Print: false
                    })
                    setID(response.data.ID)   
                }
            })
            .catch(err => {
                console.error("err", err);
            })
    }

    function checkemptyNameProduct(checkErr) {
        Render.map((key) => { // check empty the Name Product
            if (key.Qty === "0") {
                setShow({
                    valueShow: true,
                    message: `Out of stock : ${key.NameProduct}`
                })
                checkErr = false
            }
            if (key.NameProduct === "") {
                setShow({
                    valueShow: true,
                    message: "don't empty the Name Product"
                })
                checkErr = false
            }
        })
        return checkErr
    }

    const defprops = {
        options: DataCustomer,
        getOptionLabel: (options) => options.label + ' - ' + options.name
    }

    return (
        <>
            <Container>
                <Row className="mb-3">
                    <Col className="mb-1"> <h4>
                        Export Order
                    </h4></Col>

                </Row>
                <Row>
                    <Col className="mb-3" md={2}>Customer ID</Col>
                    <Col className="mb-3" md={5}>
                        <Autocomplete
                            disablePortal
                            id="IDCustomer"
                            size="small"
                            {...defprops}
                            sx={{ width: 500 }}
                            onChange={Onchangeform}
                            name="IDCustomer"
                            renderInput={(params) => <TextField {...params} onChange={Onchangeform} name="IDCustomer" />}
                        />
                    </Col>
                    <Col className="mb-0" md={5}>
                        <AlertDismissible />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AlertPaidOrderSuccess />
                    </Col>
                </Row>
                <DataOnchange.Provider
                    value={
                        { DataProduct, setDataProduct, Render, setRender }
                    }>{
                        <ExportOrderTable />
                    }
                </DataOnchange.Provider>

                <Row>
                    <Col md={4}>
                        <Button variant='success' onClick={PaidOrder} hidden={Paid.CreateOrder} >
                            <div>
                                Creare Order
                            </div>
                        </Button>
                        <Button variant='warning' hidden={Paid.Print} href={`Invoice/${getID}`}>Print</Button>
                        <Button variant='primary' hidden={Paid.Print} href='/ExportOrderPage'>New Order</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ExportOrderPage
