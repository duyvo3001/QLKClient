import { React, useState, useEffect, createContext } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import PaidOrderTable from './PaidOrderTable';
import Request from '../../api/Request';
import Alert from 'react-bootstrap/Alert';
export const DataOnchange = createContext(null);
const PaidOrderPage = () => {

    const [DataCustomer, setDataCustomer] = useState({}) //state.dataCustomer
    const [DataProduct, setDataProduct] = useState({}) //state.dataProduct
    const [formData, setFormData] = useState({}) //state formdata to request server
    const [Disount, setDisount] = useState(0) //state discount 
    const [Render, setRender] = useState([// Render table , chuyen qua table
        {
            ID: 1,
            NameProduct: "",
            Qty: 0
        }
    ])
    const [show, setShow] = useState(true);
    // console.log(DataProduct.result[0])
    useEffect(() => {
        let GrossAmountData = 0;
        let Giaban = 0;

        Render.map((key) => {// set value of GrossAmount
            if (key.NameProduct?.trim() !== "" && key.Qty !== 0) {
                const setValue = document.getElementsByName('GrossAmount')
                DataProduct.result.map((index) => {
                    if (index.MaLK == key.NameProduct) {
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

    const Onchangeform = (event) => { //get value onchange
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const onSearch = (Customer) => { //set value onsearch
        const name = 'searchCustomer';
        const value = Customer
        setFormData({ ...formData, [name]: value });
        const test = document.getElementsByName(name)
        for (let i = 0; i < test.length; i++) {
            test[i].value = Customer;
        }
    }

    const AlertDismissible = () => {
        if (show == true) {
            return (
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>

                    </p>
                </Alert>
            );
        }
    }

    useEffect(() => {   //render Product list
        Request.get('/SearchStockExport', {
            headers: { 'Authorization': sessionStorage.getItem("access_token") }
        }).then(response => {
            setDataProduct(response.data)
        }).catch(err => {
            console.error("err", err);
        })
    }, [])

    useEffect(() => {  //render Customer list
        Request.get('/SearchCustomer', {
            headers: { 'Authorization': sessionStorage.getItem("access_token") }
        }).then(response => {
            setDataCustomer(response.data)
        }).catch(err => {
            console.error("err", err);
        })
    }, [])

    function RenderSuggestion(formData, DataCustomer, onSearch) { //render suggestion Customer
        return (
            DataCustomer.result
                ?.filter((key) => {

                    const searchTerm = formData?.searchCustomer?.toLowerCase();

                    const IDCus = key.IDCustomer?.toLowerCase();

                    const startsWithSearch = searchTerm != null ? IDCus?.startsWith(searchTerm) : null

                    return searchTerm && startsWithSearch && IDCus !== searchTerm
                })
                ?.map((key) => (
                    <div className="dropdowntable-row" key={key.IDCustomer} target="-blank"
                        onClick={() => onSearch(key.IDCustomer)}
                    >
                        <div>
                            <div key={"item" + key.IDCustomer}>{key.IDCustomer}</div>
                            <div key={"item" + key.IDCustomer}>{key.NameCustomer}</div>
                            <div key={"item" + key.IDCustomer}>{key.Phone}</div>
                        </div>
                    </div>
                ))
        )
    }

    function PaidOrder() {
        Request.post('/PaidOrder',
            {
                formData, Render
            },
            {
                headers: { 'Authorization': sessionStorage.getItem("access_token") }
            })
            .then(response => {
                setDataCustomer(response.data)
            })
            .catch(err => {
                console.error("err", err);
            })
    }

    return (
        <>
            <Container>
                <Row>
                    <Col className="mb-3" md={5}> <h4>
                        Paid Order
                    </h4></Col>
                </Row>
                <Row>
                    <Col md={2}>Customer ID</Col>
                    <Col className="mb-3" md={5}>
                        <Form.Control size="sm" type="text" name="searchCustomer"
                            onChange={Onchangeform} />
                        <div className="dropdowntable">
                            {
                                RenderSuggestion(formData, DataCustomer, onSearch)
                            }
                        </div>
                    </Col>
                </Row>
                <Row>
                    <AlertDismissible />
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
                        <Form.Control size="sm" name='Discount' onChange={OnchangeDiscount} type="number" />
                        <Form.Control disabled size="sm" name='DisplayDiscount' />
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>Net Amount</Col>
                    <Col className="mb-3" md={3}><Form.Control size="sm" name="NetAmount" type="text" disabled /></Col>
                </Row>
                <div className="d-grid gap-2">
                    <Button onClick={PaidOrder} size="lg" >Paid</Button>
                </div>
            </Container>
        </>
    )
}

export default PaidOrderPage
