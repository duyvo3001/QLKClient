import { TableDT } from "./table/tableDTStock";
import { React, useState } from "react";
import Container from "react-bootstrap/Container";
import RowCol from "./RowCol";
import Form from "react-bootstrap/Form";
import Request from "../../api/Request.js";
import ButtonSubmit from "./ButtonSubmit";
import ButtonBottom from "../Import/buttonBot/buttonBottom";

const ImportStock = () => {
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
  };

  const HandleData = () => {
    Request.post(
      "/PostStock",
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
      <h5>Import : Product</h5>
      <Form onSubmit={HandleData}>
        <RowCol
          handle={HandleChange}
          text1="ID Product"
          ID1="MaLK"
          text2="Name Stock"
          ID2="TenLK"
        />
        <RowCol
          handle={HandleChange}
          text1="ID Brand"
          ID1="MaThuongHieu"
          text2="Color"
          ID2="Color"
        />
        <RowCol
          handle={HandleChange}
          text1="Unit"
          ID1="Donvi"
          text2="Quantity"
          ID2="Soluong"
        />
        <RowCol
          handle={HandleChange}
          text1="Retail price"
          ID1="GiaBanLe"
          text2="ID Warehouse"
          ID2="MaKho"
        />
        <RowCol
          handle={HandleChange}
          text1="Stock status"
          ID1="TinhTrangHang"
          text2="ID Supplier"
          ID2="MaNCC"
        />
        <ButtonSubmit />
      </Form>
      <TableDT filters={filters} setfilters={setfilters} />
      <ButtonBottom
        pageindex={pageindex}
        HandleButtonClick={HandleButtonClick}
      />
    </Container>
  );
};

export default ImportStock;
