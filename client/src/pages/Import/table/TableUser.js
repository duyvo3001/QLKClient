import { React, useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from '@mui/material/Button';
import { RequestRenderTable } from "./ActionFunction/RequestRenderTable";
import { HandleDelete } from "./ActionFunction/HandleDelete";
import DeleteIcon from '@mui/icons-material/Delete';
import ModalEdit from "../../userManegement/ModalEdit";
import { ConvertDatetime } from "../../../components/convertDateTime/DateTimeConvert"
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

    useEffect(() => {
        if (searchBox?.length !== 0 && searchBox?.length !== undefined)
            setData(searchBox)
        else
            RequestRenderTable(filters, setData, "StaffPage")
    }, [filters, searchBox])

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
            <td>
                <div className={key?._id} >
                    {ConvertDatetime(key?.NgayTao)}{" "}
                </div>
            </td>
            <td hidden={valuehidden}>
                <ModalEdit id={key.MaNV} idObj={key._id} />
                <Button size='small' variant="contained" color="error" onClick={() =>
                    HandleDelete(
                        key.MaNV, "deleteUser", RequestRenderTable,
                        filters, setData, "StaffPage"
                    )}><DeleteIcon /></Button>
            </td>
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
            <td>
                <div className={key?._id} >
                    {ConvertDatetime(key?.NgayTao)}{" "}
                </div>
            </td>
            <td hidden={valuehidden}>
                <ModalEdit id={key?.MaNV} />
                <Button variant="contained" color="error" onClick={() =>
                    HandleDelete(
                        key.MaNV, "deleteUser", RequestRenderTable,
                        filters, setData, "StaffPage"
                    )}><DeleteIcon /></Button>
            </td>
        </tr>
    ))

    return (<tbody>{datatable} </tbody>)
}

export default TableUser