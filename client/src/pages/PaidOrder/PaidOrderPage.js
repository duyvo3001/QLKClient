import { React, useState, useEffect, createContext } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import PaidOrderTable from './PaidOrderTable';
import Request from '../../api/Request';

export const DataOnchange = createContext(null);
const PaidOrderPage = () => {

    const [DataCustomer, setDataCustomer] = useState({}) //state.dataCustomer
    const [DataProduct, setDataProduct] = useState({}) //state.dataProduct
    const [formData, setFormData] = useState({}) //state formdata to request server
    const [CheckID, setCheckID] = useState(1)

    const [Render, setRender] = useState([// Render table
        {
            ID: 1,
            NameProduct: "",
            Qty: 0
        },
        {
            ID: 2,
            NameProduct: "",
            Qty: 0
        },
        {
            ID: 3,
            NameProduct: "",
            Qty: 0
        }
    ])

    const Onchangeform = (event) => { //get value onchange
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const Onchangeformtable = (event) => { //get value onchange
        setCheckID(event.target.id)
        const { name, value } = event.target;
        const updateRender = Render.map((key, index) => {
            if (event.target.id - 1 === index) {
                return {
                    ID: +event.target.id,
                    NameProduct: value,
                    Qty: 0
                }
            }
            else return key
        })
        setRender(updateRender);
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
                            <div>{key.IDCustomer}</div>
                            <div>{key.NameCustomer}</div>
                            <div>{key.Phone}</div>
                        </div>
                    </div>
                ))
        )
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

                <DataOnchange.Provider
                    value={
                        { Render, setRender, DataProduct, setDataProduct, Onchangeformtable, CheckID }
                    }>
                    <PaidOrderTable />
                </DataOnchange.Provider>


                <Row>
                    <Col md={2}>Gross Amount</Col>
                    <Col className="mb-3" md={3}><Form.Control size="sm" type="text" disabled /></Col>
                </Row>
                <Row>
                    <Col md={2}>Vat 10%</Col>
                    <Col className="mb-3" md={3}><Form.Control size="sm" value="" type="text" disabled /></Col>
                </Row>
                <Row>
                    <Col md={2}>Disount</Col>
                    <Col className="mb-3" md={3}><Form.Control size="sm" onChange={Onchangeform} name='Discount' type="text" /></Col>
                </Row>
                <Row>
                    <Col md={2}>Net Amount</Col>
                    <Col className="mb-3" md={3}><Form.Control size="sm" type="text" disabled /></Col>
                </Row>
                <div className="d-grid gap-2">
                    <Button size="lg">Paid</Button>
                </div>
            </Container>
        </>
    )
}

export default PaidOrderPage
