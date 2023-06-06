/* eslint-disable no-unused-vars */
import { React, useState, useEffect ,createContext  } from 'react'
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TableExport from './TableExport'
import { Navigate } from 'react-router-dom';
import Request from '../../api/Request';
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import PdfExportPage from './PdfExportPage';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
//get data from localStorage


// page export
const ExportPage = () => {

  const [Data, setData] = useState('')
  const [Value, setValue] = useState('')

  const [DataCus, setDataCus] = useState('')
  const [formData, setFormData] = useState('')
  const [CheckID, setCheckID] = useState(1)
  const [GrossAmount, setGrossAmount] = useState('')
  const [Vat, setVat] = useState('')
  const [Disount, setDisount] = useState('')
  const [NetAmount, setNetAmount] = useState('')

  const OnchangeForm = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  
  const onSearchForm = (item) => {
    setFormData(item)
  }

  const Onchange = (event) => {
    setCheckID(event.target.id)
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

  useEffect(() => {
    Request.get('/SearchCustomer', {
      headers: { 'Authorization': sessionStorage.getItem("access_token") }
    }).then(response => {
      setDataCus(response)
    })
  }, [])

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
            <Form.Control size="sm" value={formData} type="text" name="search" onChange={OnchangeForm} />
            <div className="dropdowntable">
              {
                DataCus?.data?.result
                  ?.filter((key) => {
                    const searchTerm = formData?.toLowerCase();
                    const IDCus = key.IDCustomer?.toLowerCase();
                    return searchTerm && IDCus?.startsWith(searchTerm) && IDCus !== searchTerm
                  })
                  ?.map((key) => (
                    <div className="dropdowntable-row" key={key.IDCustomer} target="-blank"
                      onClick={() => onSearchForm(key.IDCustomer)}
                    >
                      <div>
                        <div>{key.IDCustomer}</div>
                        <div>{key.NameCustomer}</div>
                        <div>{key.Phone}</div>
                      </div>
                    </div>
                  ))
              }
            </div>
          </Col>
        </Row>
        {/* <SearchProduct setData={setData} Data={Data} /> */}
        <TableExport
          Data={Data}
          Onchange={Onchange}
          Value={Value}
          CheckID={CheckID}
          onSearch={onSearch} />
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
          <Col className="mb-3" md={3}><Form.Control size="sm" type="text" /></Col>
        </Row>
        <Row>
          <Col md={2}>Net Amount</Col>
          <Col className="mb-3" md={3}><Form.Control size="sm" type="text" disabled /></Col>
        </Row>
        <div className="d-grid gap-2">
          <Button size="lg">Paid</Button>
        </div>
      </Container >
    </>
  )
}

export default ExportPage