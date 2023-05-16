/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TableExport from './TableExport'
import { Navigate } from 'react-router-dom';
import Request from '../../api/Request';
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import PdfExportPage from './PdfExportPage';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//get data from localStorage


// page export
const ExportPage = () => {
  const [Data, setData] = useState('')
  const [formData, setFormData] = useState('')
  const [Value,setValue] = useState('')

  const Onchange = (event) => {
    const { name, value } = event.target;
    console.log(name, value)
    setFormData({ ...formData, [name]: value });
  }

  const onSearch = (item) => {
    setValue(item)
  }

  useEffect(() => {
    Request.post('/SearchStockExport', { formData }, {
      headers: { 'Authorization': sessionStorage.getItem("access_token") }
    }).then(response => {
      console.log(response)
      setData(response)
    })
  }, [formData])

  return (
    <>
      <Container>
        <Row>
          <Col className="mb-3" md={5}> <h4>
            Export Product
          </h4></Col>
        </Row>
        <Row>
          <Col md={2}>Customer name  </Col>
          <Col className="mb-3" md={5}><Form.Control size="sm" type="text" /></Col>
        </Row>
        <Row>
          <Col md={2}>Customer address  </Col>
          <Col className="mb-3" md={5}><Form.Control size="sm" type="text" /></Col>
        </Row>
        <Row>
          <Col md={2}>Customer phone  </Col>
          <Col className="mb-3" md={5}><Form.Control size="sm" type="text" /></Col>
        </Row>
        {/* <SearchProduct setData={setData} Data={Data} /> */}
        <TableExport
          formData={formData}
          Data={Data}
          Onchange={Onchange} 
          Value={Value}
          onSearch={onSearch} />
        <Row>
          <Col className="mb-3" md={2}>Gross Amount</Col>
          <Col className="mb-3" md={2}><Form.Control size="sm" type="text" /></Col>
        </Row>
        <Row>
          <Col md={2}>Vat</Col>
          <Col className="mb-3" md={2}><Form.Control size="sm" type="text" /></Col>
        </Row>
        <Row>
          <Col md={2}>Disount</Col>
          <Col className="mb-3" md={2}><Form.Control size="sm" type="text" /></Col>
        </Row>
        <Row>
          <Col md={2}>Net Amount</Col>
          <Col className="mb-3" md={2}><Form.Control size="sm" type="text" /></Col>
        </Row>
      </Container>
    </>
  )
}

export default ExportPage