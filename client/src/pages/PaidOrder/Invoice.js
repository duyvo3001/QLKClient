import { React, useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from "react-bootstrap/Table";
import Container from 'react-bootstrap/Container';
import Request from '../../api/Request';


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
        <th>Product</th>
        <th>Price</th>
        <th>Qyt</th>
        <th>Amount</th>
      </tr>
    </thead>
  )
}
const TBodytable = (props) => {
  const { DataProduct } = props
  const datatable = DataProduct?.map((key) => (
    <tr>
      <td>{key?.TenLK}</td>
      <td>test1</td>
      <td>{key?.GiaBanLe}</td>
      <td>test1</td>
    </tr>
  ))
  // console.log(DataProduct)
  return (
    <tbody>{datatable}
    </tbody>
  )
}
const Invoice = () => {
  const idinvoice = "3dd9db678f";

  if (idinvoice) {

  }
  const [Data, setData] = useState({
    IDInvoice: "",
    Discount: 0,
    NameCustomer: "",
    Contact: ""
  })
  const [DataProduct, setDataProduct] = useState([])
  // const setValue = (Product) => {
  //   Product.map((key) => {
  //     return Request
  //       .get(
  //         `/getProduct/${key.NameProduct}`,
  //         { headers: { Authorization: sessionStorage.getItem("access_token") } })
  //       .then(async (Response) => {
  //         setDataProduct([...DataProduct, (await Response).data.result[0]])
  //       })
  //       .catch(error => console.error(error))
  //   })
  // }

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
        console.log(Product)
        // setValue(await Product)
      })
      .catch()
  }, [])

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
        <TableInvoice DataProduct={DataProduct} />
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