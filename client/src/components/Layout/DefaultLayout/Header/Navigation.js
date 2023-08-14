
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
            <DropdownProduct />
            <DropdownBrand />
            <DropdownSupplier />
            <DropdownCustomer />
            <DropdownWareHouse />
            <DropdownPaidOrder />
            <DropdownUser />
            <DropdownReport/>
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
        <Dropdown.Item href='#' >User manual</Dropdown.Item>
        <Dropdown.Item href='/login' onClick={Logout}><TbLogout2 /></Dropdown.Item>
      </Dropdown.Menu >
    </Dropdown >
  );
}

const DropdownProduct = () => {
  return <NavDropdown title="Product" id="basic-nav-dropdown1" >
    <NavDropdown.Item href="/ImportStock">Import Product</NavDropdown.Item>
    <NavDropdown.Item href="/ProductView">Manage Product</NavDropdown.Item>
    <NavDropdown.Item href="/Category">Add Category</NavDropdown.Item>
  </NavDropdown>
}
const DropdownReport = () => {
  return <NavDropdown title="Report" id="basic-nav-dropdown1" >
    <NavDropdown.Item href="/ReportInventory">Inventory</NavDropdown.Item>
    <NavDropdown.Item href="/ReportSale">Sales</NavDropdown.Item>
    <NavDropdown.Item href="/ReportOutOfStock">Out of Stock</NavDropdown.Item>
  </NavDropdown>
}
const DropdownBrand = () => {
  return <NavDropdown title="Brand" id="basic-nav-dropdown1" >
    <NavDropdown.Item href="/importBrand">Add Brand</NavDropdown.Item>
    <NavDropdown.Item href="/BrandView">Total Brand</NavDropdown.Item>
  </NavDropdown>
}

const DropdownSupplier = () => {
  return <NavDropdown title="Supplier" id="basic-nav-dropdown1" >
    <NavDropdown.Item href="/importSupplier">Add Supplier</NavDropdown.Item>
    <NavDropdown.Item href="/SupplierView">Total Supplier</NavDropdown.Item>
  </NavDropdown>
}

const DropdownCustomer = () => {
  return <NavDropdown title="Customer" id="basic-nav-dropdown1" >
    <NavDropdown.Item href="/customerPage">Add Customer</NavDropdown.Item>
    <NavDropdown.Item href="/CustomerView">Total Customer</NavDropdown.Item>
  </NavDropdown>
}

const DropdownUser = () => {
  return <NavDropdown title="User" id="basic-nav-dropdown1" >
    <NavDropdown.Item href="/userPage">Add User</NavDropdown.Item>
    <NavDropdown.Item href="/UserView">Total User</NavDropdown.Item>
  </NavDropdown>
}

const DropdownWareHouse = () => {
  return <NavDropdown title="Ware House" id="basic-nav-dropdown1" >
    <NavDropdown.Item href="/ImportWareHouse">Add WareHouse</NavDropdown.Item>
    <NavDropdown.Item href="/WareHouseView">Total WareHouse</NavDropdown.Item>
  </NavDropdown>
}

const DropdownPaidOrder = () => {
  return <NavDropdown title="Export Order" id="basic-nav-dropdown1" >
    <NavDropdown.Item href="/ExportOrderPage">Add Export Order</NavDropdown.Item>
    <NavDropdown.Item href="/PaidView">Total Order</NavDropdown.Item>
  </NavDropdown>
}
export default Navigation