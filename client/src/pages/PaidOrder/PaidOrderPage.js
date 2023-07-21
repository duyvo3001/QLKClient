import { React, useState, useEffect, createContext } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import PaidOrderTable from './PaidOrderTable';
import Request from '../../api/Request';
import Alert from 'react-bootstrap/Alert';
import { MdManageAccounts } from 'react-icons/md';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export const DataOnchange = createContext(null);
const PaidOrderPage = () => {

    const [Paid, setPaid] = useState({
        CreateOrder: false,
        Print: true
    })
    const [getID, setID] = useState(null)
    const [DataCustomer, setDataCustomer] = useState([]) //state.dataCustomer
    const [DataProduct, setDataProduct] = useState([]) //state.dataProduct
    const [formData, setFormData] = useState({}) //state formdata to request server
    const [Disount, setDisount] = useState(0) //state discount 
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
    useEffect(() => {
        let GrossAmountData = 0;
        let Giaban = 0;

        Render.map((key) => {// set value of GrossAmount

            if (key.NameProduct?.trim() !== "" && key.Qty !== 0) {
                const setValue = document.getElementsByName('GrossAmount')
                DataProduct.map((index) => {
                    if (index.label === key.NameProduct) {
                        Giaban = index.GiaBanLe
                    }
                })
                GrossAmountData += key.Qty * Giaban
                setValue[0].value = GrossAmountData?.toLocaleString();
            }
        })

        if (GrossAmountData !== 0) {// set value of Vat
            const setValue = document.getElementsByName('Vat')
            const numberVAT = GrossAmountData / 10;
            setValue[0].value = "+" + numberVAT?.toLocaleString();
        }

        if (Disount !== 0) {// display Discount value
            const setValue = document.getElementsByName('DisplayDiscount')
            const numberDiscount = GrossAmountData * Disount / 100
            setValue[0].value = "-" + numberDiscount?.toLocaleString();
        }

        if (GrossAmountData !== 0 && Disount !== 0) { // set value of NetAmount
            const setValue = document.getElementsByName('NetAmount')
            const numberNetAmount = GrossAmountData / 10 + GrossAmountData - GrossAmountData * Disount / 100
            setValue[0].value = numberNetAmount?.toLocaleString('en-CA', { useGrouping: true })
        }
        else {
            const setValue = document.getElementsByName('NetAmount')
            const numberNetAmount = GrossAmountData / 10 + GrossAmountData
            setValue[0].value = numberNetAmount?.toLocaleString('en-CA', { useGrouping: true });
        }

    }, [Render, Disount])

    const OnchangeDiscount = (event) => {
        const { name, value } = event.target;
        setDisount(+value)
        setFormData({ ...formData, [name]: value });
    }

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
    function RequestRouterSearch(Url, keyName, SetData) {
        Request
            .get(`/${Url}`,
                { headers: { Authorization: sessionStorage.getItem("access_token") } })
            .then((response) => {
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
                        return object.push({ label: key?.[keyName], key: keyName })
                    })
                }
                SetData(object)
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

        Render.map((key) => { // check empty the Name Product
            if (key.Qty == "0") {
                setShow({
                    valueShow: true,
                    message: "Out of stock :" + " " +key.NameProduct
                })
            }
            if (key.NameProduct === "") {
                setShow({
                    valueShow: true,
                    message: "don't empty the Name Product"
                })
                checkErr = false
            }
        })

        // if (checkErr === true) {
        //     Request.post('/PaidOrder',
        //         {
        //             formData, Render
        //         },
        //         {
        //             headers: { 'Authorization': sessionStorage.getItem("access_token") }
        //         })
        //         .then(response => {
        //             if (response.status === 200) {
        //                 setDisount(0)
        //                console.log(response);
        //                 setFormData({})
        //                 setSuccess({
        //                     valueShow: true,
        //                     message: response.data.message
        //                 })
        //                 setPaid({
        //                     CreateOrder: true,
        //                     Print: false
        //                 })
        //                 setID(response.data.ID)
        //                 const inputFields = [
        //                     'searchCustomer',
        //                     'search1',
        //                     'Quantity1',
        //                     'Rate1',
        //                     'GrossAmount',
        //                     'Vat',
        //                     'Discount',
        //                     'DisplayDiscount',
        //                     'NetAmount'
        //                 ];

        //                 inputFields.forEach((fieldName) => {
        //                     const elements = document.getElementsByName(fieldName);
        //                     if (elements.length > 0) {
        //                         elements[0].value = "";
        //                     }
        //                 });
        //             }
        //         })
        //         .catch(err => {
        //             console.error("err", err);
        //         })
        // }
    }
    return (
        <>
            <Container>
                <Row className="mb-3">
                    <Col className="mb-1"> <h4>
                        Paid Order
                    </h4></Col>

                </Row>
                <Row>
                    <Col md={2}> <p>
                        Total Order :
                    </p></Col>
                    <Col className="mb-3" md={2}> <h4>
                        <Button href='/PaidView'><MdManageAccounts /></Button>
                    </h4></Col>
                </Row>
                <Row>
                    <Col className="mb-3" md={2}>Customer ID</Col>
                    <Col className="mb-3" md={5}>
                        <Autocomplete
                            disablePortal
                            id="IDCustomer"
                            size="small"
                            options={DataCustomer}
                            sx={{ width: 350 }}
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
                        <PaidOrderTable />
                    }
                </DataOnchange.Provider>
                <Row>
                    <Col md={2}>Gross Amount</Col>
                    <Col className="mb-3" md={3}><Form.Control size="sm" name='GrossAmount' type="text" disabled /></Col>
                </Row>
                <Row>
                    <Col md={2}>Vat 10%</Col>
                    <Col className="mb-3" md={3}><Form.Control size="sm" name="Vat" value="" type="text" disabled /></Col>
                </Row>
                <Row>
                    <Col md={2}>Disount</Col>
                    <Col className="mb-3" md={3}>
                        <Form.Control size="sm" name='Discount' onChange={OnchangeDiscount} min={0} max={100} width={50} type="number" />
                        <Form.Control disabled size="sm" name='DisplayDiscount' />
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>Net Amount</Col>
                    <Col className="mb-3" md={3}><Form.Control size="sm" name="NetAmount" type="text" disabled /></Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Button variant='success' onClick={PaidOrder} hidden={Paid.CreateOrder} >
                            <div>
                                Creare Order
                            </div>
                        </Button>
                        <Button variant='warning' hidden={Paid.Print} href={'Invoice' + "/" + getID}>Print</Button>
                        <Button variant='primary' hidden={Paid.Print} href='/PaidOrderPage'>New Order</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default PaidOrderPage
