import NavDropdown from 'react-bootstrap/NavDropdown';

const DropdownSetting = () => {
    return <NavDropdown title="Action" id="basic-nav-dropdown" >
        <NavDropdown.Item href="#action/3.1">Edit</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Delete</NavDropdown.Item>
    </NavDropdown>
}
export default DropdownSetting