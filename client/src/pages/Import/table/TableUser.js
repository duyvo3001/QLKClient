import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import DropdownSetting from '../../Import/table/DropdownSetting'
import { TextArea } from './TextArea';
import Button from "react-bootstrap/Button";
import { CancelEdit } from "./ActionFunction/CancelEdit";
import { UpdateEdit } from "./ActionFunction/UpdateEdit";
import { RequestRenderTable } from "./ActionFunction/RequestRenderTable";
import { HandleDelete } from "./ActionFunction/HandleDelete";
import { HandleEdit } from "./ActionFunction/HandleEdit";

import React from 'react'

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
                <th>PASSWORD</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Date</th>
                <th>Access Rights</th>
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

    useEffect(() => {
        RequestRenderTable(filters, setData, "StaffPage")
    }, [filters])

    const HandleChange = (event) => {
        const { name, value } = event.target;
        const _id = _idItem;
        setFormData({ ...formData, [name]: value, _id });
    };
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
                    {key.PASSWORD}
                </div>
                <TextArea
                    className={key._id + "hidden"}
                    hidden={true}
                    onChange={HandleChange}
                    name="PASSWORD"
                    value={key.PASSWORD}
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
                <div className={key._id} hidden={false}>
                    {key.AccessRight}
                </div>
                <TextArea
                    className={key._id + "hidden"}
                    hidden={true}
                    onChange={HandleChange}
                    name="AccessRight"
                    value={key.AccessRight}
                />
            </td>
            <td>
                <DropdownSetting
                    HandleDelete={() =>
                        HandleDelete(
                            key.MaNV,
                            "deleteStock",
                            RequestRenderTable,
                            filters,
                            setData,
                            "ImportStock"
                        )
                    }
                    handleEdit={() => HandleEdit(key._id, setIdItem)} />
            </td>
            <td className={key._id + "hidden"} hidden={true}>
                <Button
                    variant="secondary"
                    onClick={() => CancelEdit(key._id, setIdItem)}>
                    cancel
                </Button>{" "}

                <Button variant="warning" onClick={
                    () => UpdateEdit(
                        key._id,
                        formData,
                        setIdItem,
                        CancelEdit,
                        RequestRenderTable,
                        filters,
                        setData,
                        "User"
                    )}>
                    update</Button>{" "}
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