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
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
function tableDTSupplier(props) {
    const { filters, valuehidden, searchBox } = props;
    return (
        <Table striped bordered hover>
            <THeadtable valuehidden={valuehidden} />
            <TBodytable searchBox={searchBox} filters={filters} valuehidden={valuehidden} />
        </Table>
    )
}
//render table
const THeadtable = (props) => {
    const { valuehidden } = props;
    return (
        <thead>
            <tr>
                <th>ID Supplier</th>
                <th>Name Supplier</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th hidden={valuehidden}>Action</th>
            </tr>
        </thead>
    )
}
//render table body
const TBodytable = (props) => {
    const [formData, setFormData] = useState({});
    const [_idItem, setIdItem] = useState(null);
    const [Data, setData] = useState(null);
    const { filters, valuehidden ,searchBox } = props;

    useEffect(() => {
        if (searchBox?.length !== 0 && searchBox?.length !== undefined)
            setData(searchBox)
        else
            RequestRenderTable(filters, setData, "HomeSupplier")
    }, [filters, searchBox])

    const HandleChange = (event) => {
        const { name, value } = event.target;
        const _id = _idItem;
        setFormData({ ...formData, [name]: value, _id });
    };
    const datatable = Data?.data?.result !== undefined ? Data?.data.result?.map(key =>
        <tr>
            <td>
                <div className={key._id} hidden={false}>
                    {key['MaNCC']}{" "}
                </div>
                <TextArea
                    className={key._id + "hidden"}
                    hidden={true}
                    onChange={HandleChange}
                    name="MaNCC"
                    value={key['MaNCC']}
                />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.TenNCC}
                </div>
                <TextArea
                    className={key._id + "hidden"}
                    hidden={true}
                    onChange={HandleChange}
                    name="TenNCC"
                    value={key.TenNCC}
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
            <td hidden={valuehidden}>
                <DropdownSetting
                    HandleDelete={() =>
                        HandleDelete(
                            key.MaLK,
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
                    <AiOutlineCloseCircle />
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
                        "Supplier"
                    )}>
                    <BiEdit /></Button>{" "}
            </td>
        </tr>
    ) : Data?.map((key) => (
        <tr>
            <td>
                <div className={key._id} hidden={false}>
                    {key['MaNCC']}{" "}
                </div>
                <TextArea
                    className={key._id + "hidden"}
                    hidden={true}
                    onChange={HandleChange}
                    name="MaNCC"
                    value={key['MaNCC']}
                />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.TenNCC}
                </div>
                <TextArea
                    className={key._id + "hidden"}
                    hidden={true}
                    onChange={HandleChange}
                    name="TenNCC"
                    value={key.TenNCC}
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
            <td hidden={valuehidden}>
                <DropdownSetting
                    HandleDelete={() =>
                        HandleDelete(
                            key.MaLK,
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
                    <AiOutlineCloseCircle />
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
                        "Supplier"
                    )}>
                    <BiEdit /></Button>{" "}
            </td>
        </tr>))
    return (
        <tbody>
            {datatable}
        </tbody>
    )

}

export { tableDTSupplier }