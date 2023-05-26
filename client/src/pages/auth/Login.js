import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import RightSide from './RightSide';
import './Login.module.scss'

const Login = () => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col md={6}>
          <RightSide/>
        </Col>
      </Row>
    </Container>
  );

}

export default Login