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
  const [Value, setValue] = useState('')

  const Onchange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (item) => {
    setValue(item)
  }

  useEffect(() => {
    Request.get('/SearchStockExport', {
      headers: { 'Authorization': sessionStorage.getItem("access_token") }
    }).then(response => {
      setData(response)
    })
  }, [])

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
          Data={Data}
          Onchange={Onchange}
          Value={Value}
          onSearch={onSearch} />
        <Row>
          <Col md={2}>Gross Amount</Col>
          <Col className="mb-3" md={3}><Form.Control size="sm" type="text" disabled /></Col>
        </Row>
        <Row>
          <Col md={2}>Vat</Col>
          <Col className="mb-3" md={3}><Form.Control size="sm" value="10%" type="text" disabled /></Col>
        </Row>
        <Row>
          <Col md={2}>Disount</Col>
          <Col className="mb-3" md={3}><Form.Control size="sm" type="text" /></Col>
        </Row>
        <Row>
          <Col md={2}>Net Amount</Col>
          <Col className="mb-3" md={3}><Form.Control size="sm" type="text" disabled /></Col>
        </Row>
      </Container>
    </>
  )
}

export default ExportPage