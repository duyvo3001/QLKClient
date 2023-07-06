import { React, useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from "react-bootstrap/Table";
import Container from 'react-bootstrap/Container';
import Request from '../../api/Request';


const TableInvoice = () => {
  return (
    <Table bordered>
      <THeadtable />
      <TBodytable borderless />
    </Table>
  )
}
const THeadtable = () => {
  return (
    <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Qyt</th>
        <th>Amount</th>
      </tr>
    </thead>
  )
}
const TBodytable = () => {

  return (
    <tbody>
      <tr>
        <td>test1</td>
        <td>test1</td>
        <td>test1</td>
        <td>test1</td>
      </tr>
    </tbody>
  )
}
const Invoice = () => {
  const idinvoice = "51e80f9a72";
  if (idinvoice) { }
  const [Data, setData] = useState({
    IDInvoice: "",
    Discount: 0,
    NameCustomer: "",
    Contact: ""
  })
  const [Product, setProduct] = useState([Data, setData])

  const setValue = () => {

  }

  const Contact = (IDCustomer) => {
    return Request
      .get(`/infoCustomer/${IDCustomer}`)
      .then(Response => { })
      .catch()
  }

  useEffect(() => {
    Request.get(
      `/getInvoice/${idinvoice}`,
      { headers: { Authorization: sessionStorage.getItem("access_token") } }
    )
      .then(Response => {
        const { IDCustomer, IDPaidOrder, Discount } = Response.data.result
        setData(
          {
            IDInvoice: IDPaidOrder,
            Discount: Discount,
            NameCustomer: Contact(IDCustomer),
            Contact: Contact(IDCustomer)
          }
        )
        setValue()
      })
      .catch()
  })

  return (
    <>
      <Container>
        <Row>
          <Col md={3}>
            <h3>Ware house system</h3>
          </Col>
        </Row>
        <Row>
          <Col md={2}><p>ID Invoice </p></Col>
          <Col md={2}><p>: {Data.IDInvoice}</p></Col>
        </Row>
        <Row>
          <Col md={2}><p>Customer </p></Col>
          <Col md={2}><p>: {Data.NameCustomer}</p></Col>
        </Row>
        <Row>
          <Col md={2}><p>Contact </p></Col>
          <Col md={2}><p>: {Data.Contact}</p></Col>
        </Row>
        <TableInvoice Product={Product} />
        <Row>
          <Col md={5} lg={5}></Col>
          <Col md={3} lg={2}>Gross Amount</Col>
          <Col md={3} lg={2}>: 123123</Col>
        </Row>
        <Row>
          <Col md={5} lg={5}></Col>
          <Col md={3} lg={2}>Vat 10%</Col>
          <Col md={3} lg={2}>: 123123</Col>
        </Row>
        <Row>
          <Col md={5} lg={5}></Col>
          <Col md={3} lg={2}>Disount</Col>
          <Col md={3} lg={2}>: 123123</Col>
        </Row>
        <Row>
          <Col md={5} lg={5}></Col>
          <Col md={3} lg={2}>Net Amount</Col>
          <Col md={3} lg={2}>: 123123</Col>
        </Row>
      </Container>
    </>
  )
}

export default Invoice