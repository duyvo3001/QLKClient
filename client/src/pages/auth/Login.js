import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import RightSide from './RightSide';
import Leftside from './LeftSide';

const Login = () => {
  return (
    <Container className='min-vh-100  justify-content-center align-items-center '>
      <Row className='justify-content'>
        <Col md={7}><Leftside/></Col>
        <Col md={5}><RightSide /></Col>
      </Row>
    </Container>
  );

}

export default Login