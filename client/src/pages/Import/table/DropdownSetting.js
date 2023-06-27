import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { SlOptions } from "react-icons/sl";
import { VscMenu } from "react-icons/vsc";
const DropdownSetting = (props) => {
    const { HandleDelete, handleEdit } = props;
    return(
        <Dropdown as={NavItem}>
          <Dropdown.Toggle as={NavLink}><VscMenu /></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleEdit}><AiOutlineEdit /></Dropdown.Item>
            <Dropdown.Item onClick={HandleDelete}><AiOutlineDelete /></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
}
export default DropdownSetting