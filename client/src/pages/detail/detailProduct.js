import React, { useEffect, useState } from 'react'
import Request from '../../api/Request';
import { useParams } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DetailProduct = () => {
  const [Data, setData] = useState({
    MaLK: "",
    Category: "",
    TenLK: "",
    Donvi: "",
    Soluong: "",
    NgayNhap: "",
    MaThuongHieu: "",
    MaNCC: "",
    Color: "",
    MaKho: "",
    GiaBanLe: "",
    TinhTrangHang: ""
  })
  const params = useParams()
  const MaLK = params.id;
  function RequestRouterSearch(Url, MaLK) {
    Request
      .get(`/${Url}/${MaLK}`,
        { headers: { Authorization: sessionStorage.getItem("access_token") } })
      .then((response) => {
        let { MaLK, Category, TenLK, Donvi, Soluong, NgayNhap, MaThuongHieu, MaNCC, Color, MaKho, GiaBanLe, TinhTrangHang } = response.data.result[0]
        setData({ MaLK, Category, TenLK, Donvi, Soluong, NgayNhap, MaThuongHieu, MaNCC, Color, MaKho, GiaBanLe, TinhTrangHang })
      })
      .catch((error) => { console.log(error) })
  }

  useEffect(() => {
    if (Data !== null) {
      RequestRouterSearch("SearchDetailProduct", MaLK)
    }
  }, [])

  return (
    <>
      <Container fluid="xxl">
        <h4 className="mb-3">Detail : Product</h4>
        <Form>
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">{"ID Product"}</Form.Label></Col>
            <Col md={4}><Form.Label column="sm">{Data.MaLK}</Form.Label></Col>
            <Col md={2}><Form.Label column="sm">{"Quantity"}</Form.Label></Col>
            <Col md={4}><Form.Label column="sm">{Data.Soluong}</Form.Label></Col>
          </Row>
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">{"Name Product"}</Form.Label></Col>
            <Col md={4}><Form.Label column="sm">{Data.TenLK}</Form.Label></Col>
            <Col md={2}><Form.Label column="sm">{"Unit"}</Form.Label></Col>
            <Col md={4}><Form.Label column="sm">{Data.Donvi}</Form.Label></Col>
          </Row>
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">{"Category"}</Form.Label></Col>
            <Col md={4}><Form.Label column="sm">{Data.Category}</Form.Label></Col>
            <Col md={2}><Form.Label column="sm">{"Retail price"}</Form.Label></Col>
            <Col md={4}><Form.Label column="sm">{Data.GiaBanLe}</Form.Label></Col>
          </Row>
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">{"Brand"}</Form.Label></Col>
            <Col md={4}><Form.Label column="sm">{Data.MaThuongHieu}</Form.Label></Col>
            <Col md={2}><Form.Label column="sm">{"Color	"}</Form.Label></Col>
            <Col md={4}><Form.Label column="sm">{Data.Color}</Form.Label></Col>
          </Row>
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">{"Supplier"}</Form.Label></Col>
            <Col md={4}><Form.Label column="sm">{Data.MaNCC}</Form.Label></Col>
            <Col md={2}><Form.Label column="sm">{"Day import"}</Form.Label></Col>
            <Col md={4}><Form.Label column="sm">{Data.NgayNhap}</Form.Label></Col>
          </Row>
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">{"Warehouse"}</Form.Label></Col>
            <Col md={4}><Form.Label column="sm">{Data.MaKho}</Form.Label></Col>
            <Col md={2}><Form.Label column="sm">{"Stock status"}</Form.Label></Col>
            <Col md={4}><Form.Label column="sm">{Data.TinhTrangHang}</Form.Label></Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export default DetailProduct