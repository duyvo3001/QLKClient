import { React, useState } from 'react'
import Container from "react-bootstrap/Container";
import RowCol from "../Import/RowCol";
import Form from 'react-bootstrap/Form';
import ButtonSubmit from "../Import/ButtonSubmit";
import Request from "../../api/Request";
import ButtonBottom from "../Import/buttonBot/buttonBottom";
import { TableCustomer } from '../Import/table/TableCustomer';

const ImportCustomer = () => {
  const [pageindex, setpageindex] = useState({
    page: 1,
  });
  const [filters, setfilters] = useState({
    page: 1,
  });
  const [formData, setFormData] = useState({});
  const HandleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  }
  const HandleData = () => {
    Request.post(
      "/ImportCustomer",
      { formData },
      { headers: { Authorization: sessionStorage.getItem("access_token") } }
    ).catch((error) => {
      console.log(error);
    });
  };
  const HandleButtonClick = (newPage) => {
    setfilters({
      ...filters,
      page: newPage,
    });
    setpageindex({ ...pageindex, page: newPage });
  };
  return (
    <Container>
      <h4>Import : Customer</h4>
      <Form onSubmit={HandleData}>
        <RowCol handle={HandleChange} text1="ID Customer" ID1="IDCustomer" text2="Name Customer" ID2="NameCustomer" />
        <RowCol handle={HandleChange} text1="Phone" ID1="Phone" text2="Email" ID2="Email" />
        <ButtonSubmit />
      </Form>
      <TableCustomer  filters={filters} setfilters={setfilters} />
      <ButtonBottom
        pageindex={pageindex}
        HandleButtonClick={HandleButtonClick}
      />
    </Container>
  )
}

export default ImportCustomer