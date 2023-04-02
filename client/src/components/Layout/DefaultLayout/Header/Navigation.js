
import 'bootstrap/dist/css/bootstrap.min.css'
import './Header.module.scss'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Logout from '../../../user/Logout';
const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
    <Container> 
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <DropdownImort/>
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="/login">Link</Nav.Link>
          <DropdownSetting/>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

const DropdownSetting = () => {
  return <NavDropdown title="Setting" id="basic-nav-dropdown" >
    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    <NavDropdown.Divider />
    <NavDropdown.Item  bg="primary" href='/login' onClick={Logout} >
      Log out
    </NavDropdown.Item>
  </NavDropdown>
}
const DropdownImort = () => {
  return <NavDropdown title="Import" id="basic-nav-dropdown1" >
    <NavDropdown.Item href="/">Import Stock</NavDropdown.Item>
    <NavDropdown.Item href="/importBrand">Import Brand</NavDropdown.Item>
    <NavDropdown.Item href="/importSupplier">Import Supplier</NavDropdown.Item>
  </NavDropdown>
};

export default Navigation