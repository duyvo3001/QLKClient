import { React, useEffect, useState, Component, useRef } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from "react-bootstrap/Table";
import Container from 'react-bootstrap/Container';
import Request from '../../api/Request';
import ReactToPrint from 'react-to-print';
import Button from 'react-bootstrap/esm/Button';

const TableInvoice = (props) => {
  const { DataProduct } = props

  return (
    <Table bordered>
      <THeadtable />
      <TBodytable borderless DataProduct={DataProduct} />
    </Table>
  )
}
const THeadtable = () => {
  return (
    <thead>
      <tr>
        <th>ID product</th>
        <th>Name product</th>
        <th>Qyt</th>
        <th>Price</th>
        <th>Amount</th>
      </tr>
    </thead>
  )
}
const TBodytable = (props) => {
  const { DataProduct } = props
  const datatable = DataProduct?.map((key) => (
    <tr>
      <td>{key?.IDProduct}</td>
      <td>{key?.NameProduct}</td>
      <td>{key?.Qty}</td>
      <td>{key?.GiaBanLe}</td>
      <td>{key?.GiaBanLe * key?.Qty}</td>
    </tr>
  ))
  // console.log(DataProduct)
  return (
    <tbody>{datatable}
    </tbody>
  )
}
const Invoice = () => {
  const idinvoice = "23764dbea4";
  const componentRef = useRef();
  if (idinvoice) {

  }
  const [Data, setData] = useState({
    IDInvoice: "",
    Discount: 0,
    NameCustomer: "",
    Contact: ""
  })
  const [DataProduct, setDataProduct] = useState([])
  const [TotalAmount, setTotalAmount] = useState(
    {
      GrossAmount: 0,
      Vat: 0,
      Discount: 0,
      NetAmount: 0
    }
  )
  const Contact = (IDCustomer) => {
    return Request
      .get(
        `/infoCustomer/${IDCustomer}`,
        { headers: { Authorization: sessionStorage.getItem("access_token") } })
      .then(async (Response) => {
        return {
          NameCustomer: await Response.data.result[0].NameCustomer,
          Phone: await Response.data.result[0].Phone
        }
      })
      .catch()
  }

  useEffect(() => {
    Request.get(
      `/getInvoice/${idinvoice}`,
      { headers: { Authorization: sessionStorage.getItem("access_token") } }
    )
      .then(async (Response) => {
        const { IDCustomer, IDPaidOrder, Discount, Product } = Response.data.result[0]
        const Customer = Contact(IDCustomer)
        setData(
          {
            IDInvoice: IDPaidOrder,
            Discount: Discount,
            NameCustomer: (await Customer).NameCustomer,
            Contact: (await Customer).Phone
          }
        )
        setDataProduct(Product)
      })
      .catch()
  }, [])

  useEffect(() => {

    let GrossAmount = 0;
    DataProduct.map((key) => {
      GrossAmount += key.GiaBanLe * key.Qty
    })
    setTotalAmount({
      GrossAmount: GrossAmount,
      Vat: GrossAmount * 1 / 10,
      Discount: GrossAmount * Data?.Discount / 100,
      NetAmount: GrossAmount / 10 + GrossAmount - GrossAmount * Data?.Discount / 100
    })
  }, [DataProduct])

  return (
    <>
      <ReactToPrint
        trigger={() => {
          return (<Button className='mb-3' variant='success'>Print Invoice</Button>)
        }}
        content={() => componentRef.current}
        documentTitle='Invoice'
        pageStyle='print'
      />
      <Button className='mb-3' variant='secondary' href='/'>Back</Button>
      <div ref={componentRef}>
        <Container >
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
          <TableInvoice DataProduct={DataProduct} />
          <Row>
            <Col md={7} lg={8}></Col>
            <Col md={3} lg={2}>Gross Amount</Col>
            <Col md={2} lg={2}>: {TotalAmount.GrossAmount} $</Col>
          </Row>
          <Row>
            <Col md={7} lg={8}></Col>
            <Col md={3} lg={2}>Vat 10%</Col>
            <Col md={2} lg={2}>: {TotalAmount.Vat} $</Col>
          </Row>
          <Row>
            <Col md={7} lg={8}></Col>
            <Col md={3} lg={2}>Disount</Col>
            <Col md={2} lg={2}>: {TotalAmount.Discount} $</Col>
          </Row>
          <Row>
            <Col md={7} lg={8}></Col>
            <Col md={3} lg={2}><h5>Net Amount</h5></Col>
            <Col md={2} lg={2}><h5>: {TotalAmount.NetAmount} $</h5></Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Invoice