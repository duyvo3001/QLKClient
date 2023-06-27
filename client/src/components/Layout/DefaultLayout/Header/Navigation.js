
import 'bootstrap/dist/css/bootstrap.min.css'
import './Header.module.scss'
import NavLink from 'react-bootstrap/NavLink';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Logout from '../../../user/Logout';
import { VscSettingsGear } from "react-icons/vsc";
import { TbLogout2 } from "react-icons/tb";
const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <DropdownImort />
            <Nav.Link href="/PaidOrderPage">Order</Nav.Link>
            <DropdownSetting />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

const DropdownSetting = () => {
  return (
    <Dropdown as={NavItem}>
      <Dropdown.Toggle as={NavLink}><VscSettingsGear /></Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href='/login' onClick={Logout}><TbLogout2/></Dropdown.Item>
      </Dropdown.Menu >
    </Dropdown >
  );
}
const DropdownImort = () => {
  return <NavDropdown title="Add" id="basic-nav-dropdown1" >
    <NavDropdown.Item href="/ImportStock">Product</NavDropdown.Item>
    <NavDropdown.Item href="/importBrand">Brand</NavDropdown.Item>
    <NavDropdown.Item href="/importSupplier">Supplier</NavDropdown.Item>
    <NavDropdown.Item href="/customerPage">Customer</NavDropdown.Item>
    <NavDropdown.Item href="/userPage">User</NavDropdown.Item>
    <NavDropdown.Item href="/ImportWareHouse">WareHouse</NavDropdown.Item>
  </NavDropdown>
};

export default Navigation