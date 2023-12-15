import React, { useEffect, useState } from 'react'
import Request from '../../api/Request';
import { useParams } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DetailProduct = () => {
  const [Data, setData] = useState(null)
  const params = useParams()
  const MaLK = params.id;
  console.log(Data)
  function RequestRouterSearch(Url, MaLK, setData) {
    Request
      .get(`/${Url}/${MaLK}`,
        { headers: { Authorization: sessionStorage.getItem("access_token") } })
      .then((response) => {
        setData(response.data.result[0])
      })
      .catch((error) => { console.log(error) })
  }

  useEffect(() => {
    if (Data === null) {
      RequestRouterSearch("SearchDetailProduct", MaLK, setData)
    }
  }, [Data])

  return (
    <>
      <Container fluid="xxl">
        <h4 className="mb-3">Detail : Product</h4>
        <Form>
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">{"ID Product"}</Form.Label></Col>
            <Col md={4}><Form.Label column="sm">{"Category"}</Form.Label></Col>
            <Col md={2}><Form.Label column="sm">{"ID Product"}</Form.Label></Col>
            <Col md={4}><Form.Label column="sm">{"Category"}</Form.Label></Col>
          </Row>
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">{"ID Product"}</Form.Label></Col>
            <Col md={4}><Form.Label column="sm">{"Category"}</Form.Label></Col>
            <Col md={2}><Form.Label column="sm">{"ID Product"}</Form.Label></Col>
            <Col md={4}><Form.Label column="sm">{"Category"}</Form.Label></Col>
          </Row>
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">{"ID Product"}</Form.Label></Col>
            <Col md={4}><Form.Label column="sm">{"Category"}</Form.Label></Col>
            <Col md={2}><Form.Label column="sm">{"ID Product"}</Form.Label></Col>
            <Col md={4}><Form.Label column="sm">{"Category"}</Form.Label></Col>
          </Row>
          <Row className='mb-2 row'>
            <Col md={2}><Form.Label column="sm">{"ID Product"}</Form.Label></Col>
            <Col md={4}><Form.Label column="sm">{"Category"}</Form.Label></Col>
            <Col md={2}><Form.Label column="sm">{"ID Product"}</Form.Label></Col>
            <Col md={4}><Form.Label column="sm">{"Category"}</Form.Label></Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export default DetailProduct