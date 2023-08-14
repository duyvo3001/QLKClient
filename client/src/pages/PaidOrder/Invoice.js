import { React, useEffect, useState, useRef } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from "react-bootstrap/Table";
import Container from 'react-bootstrap/Container';
import Request from '../../api/Request';
import ReactToPrint from 'react-to-print';
import Button from 'react-bootstrap/esm/Button';
import { useParams } from 'react-router-dom';

const TableInvoice = (props) => {
  const { DataProduct } = props

  return (
    <Table>
      <THeadtable />
      <TBodytable DataProduct={DataProduct} />
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
    </tr>
  ))

  return (
    <tbody>{datatable}</tbody>
  )
}
const Invoice = () => {
  const params = useParams()
  const componentRef = useRef();

  const idinvoice = params.id;
  if (!idinvoice) {
  }
  const [Data, setData] = useState({
    IDInvoice: "",
    NameCustomer: "",
    Contact: ""
  })
  const [DataProduct, setDataProduct] = useState([])

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
        const { IDCustomer, IDPaidOrder, Product } = Response.data.result[0]
        const Customer = Contact(IDCustomer)
        setData(
          {
            IDInvoice: IDPaidOrder,
            NameCustomer: (await Customer).NameCustomer,
            Contact: (await Customer).Phone
          }
        )
        setDataProduct(Product)
      })
      .catch()
  }, [])

  return (
    <>
      <Button className='mb-3' variant='secondary' href='/PaidView'>Back</Button>
      <ReactToPrint
        trigger={() => {
          return (<Button className='mb-3' variant='success'>Print Invoice</Button>)
        }}
        content={() => componentRef.current}
        documentTitle='Invoice'
        pageStyle='print'
      />
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
        </Container>
      </div>
    </>
  )
}

export default Invoice