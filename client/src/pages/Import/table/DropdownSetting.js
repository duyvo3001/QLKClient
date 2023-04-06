import NavDropdown from 'react-bootstrap/NavDropdown';

const handleClick = () =>{
// xu ly khi clicked
}

const DropdownSetting = (props) => {
    return <NavDropdown title="Action" id="basic-nav-dropdown" >
        <NavDropdown.Item onClick={handleClick} id={props.ID} >Edit</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2" id={props.ID}>Delete</NavDropdown.Item>
    </NavDropdown>
}
export default DropdownSetting