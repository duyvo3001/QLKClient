import { React, useState } from 'react'
import { TableWareHouse as TableDT } from './TableWareHouse';
import Container from "react-bootstrap/Container";
import RowCol from '../Import/RowCol';
import ButtonSubmit from '../Import/ButtonSubmit';
import Form from "react-bootstrap/Form";
import Request from "../../api/Request.js";
import ButtonBottom from '../Import/buttonBot/buttonBottom';
const ImportWareHouse = () => {
  const [pageindex, setpageindex] = useState({
    page: 1,
  });
  const [filters, setfilters] = useState({
    page: 1,
  });
  const [formData, setFormData] = useState({});

  const HandleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const HandleData = () => {
    Request.post(
      "/importWarehouse",
      { formData },
      { headers: { Authorization: sessionStorage.getItem("access_token") } }
    ).then(respone => console.log(respone)
    )
      .catch((error) => {
        console.log(error);
      });
  };

  const HandleButtonClick = (newPage) => {
    setfilters({ ...filters, page: newPage, });
    setpageindex({ ...pageindex, page: newPage });
  };
  return (
    <Container>
      <h4>Import : Warehouse</h4>
      <Form onSubmit={HandleData}>
        <RowCol
          handle={HandleChange}
          text1="ID Warehouse"
          ID1="MaKho"
          text2="Name Warehouse"
          ID2="TenKho"
        />
        <RowCol
          handle={HandleChange}
          text1="Address"
          ID1="DiaChi"
          text2="Phone"
          ID2="SDT"
        />
        <ButtonSubmit />
      </Form>
      <TableDT filters={filters} setfilters={setfilters} />
      <ButtonBottom pageindex={pageindex} HandleButtonClick={HandleButtonClick} />
    </Container>
  )
}

export default ImportWareHouse