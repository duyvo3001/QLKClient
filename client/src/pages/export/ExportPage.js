/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TableExport from './TableExport'
import { Navigate } from 'react-router-dom';
import Request from '../../api/Request';
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfExportPage from './PdfExportPage';
//get data from localStorage
export const getDataForm = () => {
  const data = localStorage.getItem('dataExport');
  if (data) {
    return JSON.parse(data)
  }
  else return []
}
function HandleExportProduct() {
  console.log('export')
  return (
    <Navigate to="/" replace={true} />
  );
  // let keyMaLK = [];
  // Data?.map((key) => (
  //   keyMaLK.push(key.MaLK)
  //   ))
  // console.log(keyMaLK)
  // Request.post(
  //   "/exportfile",
  //   { keyMaLK },
  //   { headers: { Authorization: sessionStorage.getItem("access_token") } }
  // )
  //   .catch((error) => {
  //     console.log(error);
  //   });
}
// page export
const ExportPage = () => {
  const [Data, setData] = useState(getDataForm())

  return (
    <>
      <h4>
        Export Product
      </h4>
      <SearchProduct setData={setData} Data={Data} />
      <TableExport Data={Data} />
      <ButtonSubmit HandleExportProduct={HandleExportProduct} />
      <div className="App">
      </div>
    </>
  )
}
const SearchProduct = (props) => {

  const [formData, setFormData] = useState('');
  const { Data, setData } = props

  const HandleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const HandleData = (event) => {
    event.preventDefault();
    Request.post(
      "/SearchStockExport",
      { formData },
      { headers: { Authorization: sessionStorage.getItem("access_token") } }
    ).then((response) => {
      let dataRes = response?.data?.result[0]
      setData([...Data, dataRes]);
      // cookie
    })
      .catch((error) => {
        console.log(error);
      });
    setFormData('')
  };

  useEffect(() => {
    localStorage.setItem('dataExport', JSON.stringify(Data))
  }, [Data])

  return (
    <>
      <Form onSubmit={HandleData}>
        <Form.Control className="me-auto"
          placeholder="Search item here ..."
          name="search"
          onChange={HandleChange}
        />
        <Button type="submit" variant="secondary">Submit</Button>
      </Form>
    </>
  )
}

const ButtonSubmit = (props) => {
  const { HandleExportProduct } = props
  return (
    <Button type="submit" variant="success" href="/PdfExportPage">Export Product</Button>
  )
}
export default ExportPage