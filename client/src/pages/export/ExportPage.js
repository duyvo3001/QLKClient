/* eslint-disable no-unused-vars */
import { React, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TableExport from './TableExport'
import Request from '../../api/Request';

const ExportPage = () => {
  const [Data, setData] = useState([])
  const HandleExportProduct = () => {
    // update status of export
    // xuat file export
    let keyMaLK = [];
    Data?.map((key) => (
      keyMaLK.push(key.MaLK)
      ))
    console.log(keyMaLK)
    Request.post(
      "/exportfile",
      { keyMaLK },
      { headers: { Authorization: sessionStorage.getItem("access_token") } }
    )
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <div>Export Product</div>
      <SearchProduct setData={setData} Data={Data} />
      <TableExport Data={Data} />
      <ButtonSubmit HandleExportProduct={HandleExportProduct} />
    </>
  )
}
const SearchProduct = (props) => {
  const [formData, setFormData] = useState({});
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
  };

  return (
    <>
      <Form onSubmit={HandleData}>
        <p>eror</p>
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
    <Button type="submit" variant="danger" onClick={HandleExportProduct}>Export Product</Button>
  )
}
export default ExportPage