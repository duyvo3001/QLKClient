import { React, useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import DropdownSetting from '../../Import/table/DropdownSetting'
import { TextArea } from './TextArea';
import Button from "react-bootstrap/Button";
import { CancelEdit } from "./ActionFunction/CancelEdit";
// import { UpdateEdit } from "./ActionFunction/UpdateEdit";
import { UpdateEditUser } from "./ActionFunction/UpdateEdit";
import { RequestRenderTable } from "./ActionFunction/RequestRenderTable";
import { HandleDelete } from "./ActionFunction/HandleDelete";
import { HandleEdit } from "./ActionFunction/HandleEdit";
import UpdatePassword from "../../userManegement/UpdatePassword";
import UpdateAccess from "../../userManegement/UpdateAccess";
import { GrDocumentUpdate } from 'react-icons/gr';
import { MdOutlineCancel } from 'react-icons/md';
const TableUser = (props) => {
    const { filters } = props;
    return (
        <Table striped bordered hover>
            <THeadtable />
            <TBodytable filters={filters} />
        </Table>
    )
}
const THeadtable = () => {
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
                <th>Action</th>
            </tr>
        </thead>
    )
}
const TBodytable = (props) => {
    const { filters } = props;
    const [Data, setData] = useState(null);
    const [formData, setFormData] = useState({});
    const [_idItem, setIdItem] = useState(null);
    const [showAlter, setShowAlter] = useState(false);

    const [AccessRight, setAccessRight] = useState({
        update: "false",
        create: "false",
        read: "false",
        valuedelete: "false",
    })

    useEffect(() => {
        RequestRenderTable(filters, setData, "StaffPage")
    }, [filters])

    const HandleChange = (event) => {
        const { name, value } = event.target;
        updateformData(name, value)
        checkPass(name, value)
        updateAccessRight(name, value)
    };
    function updateAccessRight(name, value) {
        switch (name) {
            case "update":
                if (value === "false") updatePrevState(name, "true")
                else updatePrevState(name, "false")
                break;
            case "create":
                if (value === "false") updatePrevState(name, "true")
                else updatePrevState(name, "false")
                break;
            case "delete":
                if (value === "false") updatePrevState(name, "true")
                else updatePrevState(name, "false")
                break;
            default:
                if (value === "false") updatePrevState(name, "true")
                else updatePrevState(name, "false")
                break;
        }
    }
    function updatePrevState(key, value) {
        switch (key) {
            case "update":
                setAccessRight(prevState => ({
                    ...prevState,
                    update: value
                }));
                break;
            case "create":
                setAccessRight(prevState => ({
                    ...prevState,
                    create: value
                }));
                break;
            case "delete":
                setAccessRight(prevState => ({
                    ...prevState,
                    delete: value
                }));
                break;

            default:
                setAccessRight(prevState => ({
                    ...prevState,
                    read: value
                }));
                break;
        }

    }
    function updateformData(name, value) {
        if (name !== "pass_nv" && name !== "repass_nv" && name !== "update" && name !== "delete" && name !== "create" && name !== "read") {
            const _id = _idItem;
            setFormData({ ...formData, [name]: value, _id });
        }
    }
    function checkPass(name, value) {
        console.log(name,value);
        if (name !== " ") {
            const _id = _idItem;
            setFormData({ ...formData, [name]: value, _id });
        }
        if (name === "repass_nv") {
            if (value !== formData?.pass_nv) {
                const _id = _idItem;
                setFormData({ ...formData, [name]: value, _id });
                setShowAlter(true)
            }
            else {
                const _id = _idItem;
                setFormData({ ...formData, [name]: value, _id });
                setShowAlter(false)
            }
        }

    }
    function RenderAccess(Data, ID) {
        return Data?.data?.result
            ?.filter((key) => {
                if (key?._id === ID) {
                    return key
                }
            })
            ?.map((key) => {
                return key?.AccessRight
            }
            )

    }
    const datatable = Data?.data.result?.map(
        key => <tr>
            <td>
                <div className={key._id} hidden={false}>
                    {key['MaNV']}{" "}
                </div>
                <TextArea
                    className={key._id + "hidden"}
                    hidden={true}
                    onChange={HandleChange}
                    name="MaNV"
                    value={key['MaNV']}
                />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.TenNV}
                </div>
                <TextArea
                    className={key._id + "hidden"}
                    hidden={true}
                    onChange={HandleChange}
                    name="TenNV"
                    value={key.TenNV}
                />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.GioiTinh}
                </div>
                <TextArea
                    className={key._id + "hidden"}
                    hidden={true}
                    onChange={HandleChange}
                    name="GioiTinh"
                    value={key.GioiTinh}
                />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.DiaChi}
                </div>
                <TextArea
                    className={key._id + "hidden"}
                    hidden={true}
                    onChange={HandleChange}
                    name="DiaChi"
                    value={key.DiaChi}
                />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.NgaySinh}
                </div>
                <TextArea
                    className={key._id + "hidden"}
                    hidden={true}
                    onChange={HandleChange}
                    name="NgaySinh"
                    value={key.NgaySinh}
                />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.USER_NV}
                </div>
                <TextArea
                    className={key._id + "hidden"}
                    hidden={true}
                    onChange={HandleChange}
                    name="USER_NV"
                    value={key.USER_NV}
                />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.SDT}
                </div>
                <TextArea
                    className={key._id + "hidden"}
                    hidden={true}
                    onChange={HandleChange}
                    name="SDT"
                    value={key.SDT}
                />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.Email}
                </div>
                <TextArea
                    className={key._id + "hidden"}
                    hidden={true}
                    onChange={HandleChange}
                    name="Email"
                    value={key.Email}
                />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.NgayTao}
                </div>
                <TextArea
                    className={key._id + "hidden"}
                    hidden={true}
                    onChange={HandleChange}
                    name="NgayTao"
                    value={key.NgayTao}
                />
            </td>
            <td>
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
                    handleEdit={() => HandleEdit(key._id, setIdItem)} />
            </td>
            <td className={key._id + "hidden"} hidden={true}>
                <Button size="sm" variant="warning" onClick={
                    () => UpdateEditUser(
                        key._id,
                        formData,
                        AccessRight,
                        setIdItem,
                        CancelEdit,
                        RequestRenderTable,
                        filters,
                        setData,
                        "User"
                    )}>
                     <GrDocumentUpdate/></Button>{" "}
                <UpdatePassword showAlter={showAlter} HandleChange={HandleChange} />{" "}

                <UpdateAccess IDdata={key._id} Data={RenderAccess(Data, key._id)} HandleChange={HandleChange} />{" "}

                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => CancelEdit(key._id, setIdItem)}>
                   <MdOutlineCancel/>
                </Button>{" "}
            </td>
        </tr>
    )
    return (
        <tbody>
            {datatable}
        </tbody>
    )
}

export default TableUser