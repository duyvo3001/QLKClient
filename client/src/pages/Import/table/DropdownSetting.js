import { useEffect } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Request from '../../../api/Request'

const handleClick = () => {
    // xu ly khi clicked
}
const HandleClickDelete = (id) => {
    // xu ly khi clicked
    useEffect(()=>{
        Request.post(`/deleteBrand/${id}`, { headers: { Authorization: sessionStorage.getItem("access_token") } })
        .then()
        .catch(eror =>{console.error(eror)})
    })

}
const DropdownSetting = (props) => {
    return <NavDropdown title="Action" id="basic-nav-dropdown" >
        <NavDropdown.Item onClick={handleClick} id={props.ID} >Edit</NavDropdown.Item>
        <NavDropdown.Item onClick={HandleClickDelete(props.ID)} id={props.ID}>Delete</NavDropdown.Item>
    </NavDropdown>
}
export default DropdownSetting