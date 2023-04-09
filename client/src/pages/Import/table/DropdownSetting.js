import NavDropdown from 'react-bootstrap/NavDropdown';


const DropdownSetting = (props) => {
    const { handleDelete ,handleEdit  } = props;

    return <NavDropdown title="Action" id="basic-nav-dropdown" >
        <NavDropdown.Item onClick={handleEdit}  >Edit</NavDropdown.Item>
        <NavDropdown.Item onClick={handleDelete} >Delete</NavDropdown.Item>
    </NavDropdown>
}
export default DropdownSetting