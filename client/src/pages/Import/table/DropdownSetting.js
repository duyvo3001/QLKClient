import NavDropdown from 'react-bootstrap/NavDropdown';

const HandleClickEdit = () => {
    console.warn('handleClick');
}

const DropdownSetting = (props) => {
    const { handleDelete } = props;

    return <NavDropdown title="Action" id="basic-nav-dropdown" >
        <NavDropdown.Item onClick={HandleClickEdit}  >Edit</NavDropdown.Item>
        <NavDropdown.Item onClick={handleDelete} >Delete</NavDropdown.Item>
    </NavDropdown>
}
export default DropdownSetting