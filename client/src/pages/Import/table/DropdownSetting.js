import NavDropdown from 'react-bootstrap/NavDropdown';


const DropdownSetting = (props) => {
    const { HandleDelete ,handleEdit  } = props;

    return <NavDropdown title="Action" id="basic-nav-dropdown" >
        <NavDropdown.Item onClick={handleEdit}  >Edit</NavDropdown.Item>
        <NavDropdown.Item onClick={HandleDelete} >Delete</NavDropdown.Item>
    </NavDropdown>
}
export default DropdownSetting