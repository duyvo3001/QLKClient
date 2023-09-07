import { React, useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import DropdownSetting from '../../Import/table/DropdownSetting'
import { TextArea } from './TextArea';
import Button from '@mui/material/Button';
import { CancelEdit } from "./ActionFunction/CancelEdit";
// import { UpdateEdit } from "./ActionFunction/UpdateEdit";
import { UpdateEditUser } from "./ActionFunction/UpdateEdit";
import { RequestRenderTable } from "./ActionFunction/RequestRenderTable";
import { HandleDelete } from "./ActionFunction/HandleDelete";
import { HandleEdit } from "./ActionFunction/HandleEdit";
import UpdatePassword from "../../userManegement/UpdatePassword";
import { GrDocumentUpdate } from 'react-icons/gr';
import { MdOutlineCancel } from 'react-icons/md';
import AccessRight from "../../userManegement/AccessRight";
import ModalEdit from "../../userManegement/ModalEdit";
const TableUser = (props) => {
    const { filters, valuehidden, searchBox } = props;
    return (
        <Table hover>
            <THeadtable valuehidden={valuehidden} />
            <TBodytable filters={filters} valuehidden={valuehidden} searchBox={searchBox} />
        </Table>
    )
}
const THeadtable = (props) => {
    const { valuehidden } = props
    return (
        <thead>
            <tr>
                <th>ID Staff</th>
                <th>Name Staff</th>
                <th>Sex</th>
                <th>Address</th>
                <th>Date of birth</th>
                <th>User Staff</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Date</th>
                <th hidden={valuehidden}>Action</th>
            </tr>
        </thead>
    )
}
const TBodytable = (props) => {
    const { filters, valuehidden, searchBox } = props;
    const [Data, setData] = useState(null);
    // const [formData, setFormData] = useState({});
    // const [_idItem, setIdItem] = useState(null);
    // const [showAlter, setShowAlter] = useState(false);
    // const objCrud = {
    //     create: false, delete: false, update: false, read: false
    // }
    // const [Accessright, setAccessright] = useState({
    //     Product: objCrud,
    //     Inventory: objCrud,
    //     Brand: objCrud,
    //     Supllier: objCrud,
    //     Customer: objCrud,
    //     Warehouse: objCrud,
    //     Export: objCrud,
    //     User: objCrud,
    // })

    useEffect(() => {
        if (searchBox?.length !== 0 && searchBox?.length !== undefined)
            setData(searchBox)
        else
            RequestRenderTable(filters, setData, "StaffPage")
    }, [filters, searchBox])

    // const HandleChange = (event) => {
    //     const { name, value } = event.target;
    //     console.log(name, value)
    //     updateformData(name, value)
    //     checkPass(name, value)
    // };
    // function updateformData(name, value) {
    //     if (name !== "pass_nv" && name !== "repass_nv" && name !== "update" && name !== "delete" && name !== "create" && name !== "read") {
    //         const _id = _idItem;
    //         setFormData({ ...formData, [name]: value, _id });
    //     }
    // }
    // function checkPass(name, value) {
    //     if (name !== " ") {
    //         const _id = _idItem;
    //         setFormData({ ...formData, [name]: value, _id });
    //     }
    //     if (name === "repass_nv") {
    //         if (value !== formData?.pass_nv) {
    //             const _id = _idItem;
    //             setFormData({ ...formData, [name]: value, _id });
    //             setShowAlter(true)
    //         }
    //         else {
    //             const _id = _idItem;
    //             setFormData({ ...formData, [name]: value, _id });
    //             setShowAlter(false)
    //         }
    //     }
    // }

    // function deleteUser() {
    //     HandleDelete(
    //         key.MaNV, "deleteUser", RequestRenderTable,
    //         filters, setData, "StaffPage"
    //     )
    // }

    const TextComponent = (props) => {
        const { Datakey, name } = props
        return (
            <>
                <td>
                    <div className={Datakey?._id} >
                        {Datakey?.[name]}{" "}
                    </div>
                </td>
            </>
        )
    }
    const Datacheck = Data?.data?.result
    const datatable = Datacheck !== undefined ? Datacheck.map((key) =>
        <tr>
            <TextComponent Datakey={key} name={'MaNV'} />
            <TextComponent Datakey={key} name={'TenNV'} />
            <TextComponent Datakey={key} name={'GioiTinh'} />
            <TextComponent Datakey={key} name={'DiaChi'} />
            <TextComponent Datakey={key} name={'NgaySinh'} />
            <TextComponent Datakey={key} name={'USER_NV'} />
            <TextComponent Datakey={key} name={'SDT'} />
            <TextComponent Datakey={key} name={'Email'} />
            <TextComponent Datakey={key} name={'NgayTao'} />
            <td hidden={valuehidden}>
                <ModalEdit id={key.MaNV} />
                <Button variant="contained" onClick={() =>
                    HandleDelete(
                        key.MaNV, "deleteUser", RequestRenderTable,
                        filters, setData, "StaffPage"
                    )}>delete</Button>
            </td>
            {/* <td className={key?._id + "hidden"} hidden={true}>
                <Button size="sm" variant="warning" onClick={
                    () => UpdateEditUser(
                        key?._id,
                        formData,
                        Accessright,
                        setIdItem,
                        CancelEdit,
                        RequestRenderTable,
                        filters,
                        setData,
                        "User"
                    )}>
                    Update User</Button>{" "}
                <UpdatePassword showAlter={showAlter} HandleChange={HandleChange} />{" "}

                <AccessRight Accessright={Accessright} setAccessright={setAccessright} />
                <ModalEdit />
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => CancelEdit(key?._id, setIdItem)}>
                    <MdOutlineCancel />Cancel
                </Button>{" "}
            </td> */}
        </tr>
    ) : Data?.map((key) => (
        <tr>
            <TextComponent Datakey={key} name={'MaNV'} />
            <TextComponent Datakey={key} name={'TenNV'} />
            <TextComponent Datakey={key} name={'GioiTinh'} />
            <TextComponent Datakey={key} name={'DiaChi'} />
            <TextComponent Datakey={key} name={'NgaySinh'} />
            <TextComponent Datakey={key} name={'USER_NV'} />
            <TextComponent Datakey={key} name={'SDT'} />
            <TextComponent Datakey={key} name={'Email'} />
            <TextComponent Datakey={key} name={'NgayTao'} />
            <td hidden={valuehidden}>
                <ModalEdit id={key?.MaNV} />
                <Button variant="contained" onClick={() =>
                    HandleDelete(
                        key.MaNV, "deleteUser", RequestRenderTable,
                        filters, setData, "StaffPage"
                    )}>delete</Button>
            </td>
            {/* <td hidden={valuehidden}>
                <DropdownSetting
                    HandleDelete={() =>
                        HandleDelete(
                            key.MaNV,
                            "deleteUser",
                            RequestRenderTable,
                            filters,
                            setData,
                            "StaffPage"
                        )
                    }
                    handleEdit={() => HandleEdit(key?._id, setIdItem)} />
            </td>
            <td className={key?._id + "hidden"} hidden={true}>
                <Button size="sm" variant="warning" onClick={
                    () => UpdateEditUser(
                        key?._id,
                        formData,
                        AccessRight,
                        setIdItem,
                        CancelEdit,
                        RequestRenderTable,
                        filters,
                        setData,
                        "User"
                    )}>
                    <GrDocumentUpdate /></Button>{" "}
                <UpdatePassword showAlter={showAlter} HandleChange={HandleChange} />{" "}

                <AccessRight Accessright={Accessright} setAccessright={setAccessright} />

                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => CancelEdit(key?._id, setIdItem)}>
                    Cancel
                </Button>{" "}
            </td> */}
        </tr>
    ))

    return (<tbody>{datatable} </tbody>)
}

export default TableUser