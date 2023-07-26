import { React, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import classnames from "classnames/bind";
import Button from "react-bootstrap/Button";
import * as style from "../Import/table/scss/TableDTBrand.module.scss"
import DropdownSetting from "../Import/table/DropdownSetting";
import { RequestRenderTable } from "../Import/table/ActionFunction/RequestRenderTable";
import { CancelEdit } from "../Import/table/ActionFunction/CancelEdit";
import { HandleDelete } from "../Import/table/ActionFunction/HandleDelete";
import { HandleEdit } from "../Import/table/ActionFunction/HandleEdit";
import { UpdateEdit } from "../Import/table/ActionFunction/UpdateEdit";
import { TextArea } from "../Import/table/TextArea";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
const cx = classnames.bind(style);
const TableWareHouse = (props) => {
    const { filters, valuehidden, searchBox } = props;
    return (
        <Table hover>
            <THeadtable valuehidden={valuehidden} />
            <TBodytable searchBox={searchBox} filters={filters} valuehidden={valuehidden} />
        </Table>
    );
}
const THeadtable = (props) => {
    const { valuehidden } = props;
    return (
        <thead>
            <tr>
                <th>ID Warehouse</th>
                <th>Name Warehouse</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Date Import</th>
                <th hidden={valuehidden}>Action</th>
            </tr>
        </thead>
    );
}
const TBodytable = (props) => {
    const { filters, valuehidden, searchBox } = props;
    const [Data, setData] = useState(null);
    const [formData, setFormData] = useState({});
    const [_idItem, setIdItem] = useState(null);
    //request render table State
    useEffect(() => {
        if (searchBox?.length !== 0 && searchBox?.length !== undefined) {
            setData(searchBox)
        }
        else RequestRenderTable(filters, setData, "WareHousePage");
    }, [filters,searchBox]);

    // handle text area change events
    const HandleChange = (event) => {
        const { name, value } = event.target;
        const _id = _idItem;
        setFormData({ ...formData, [name]: value, _id });
    };

    //handle data table
    const datatable =  Data?.data?.result !== undefined ? Data?.data.result?.map((key) => (
        <>
            <tr>
                <td>
                    <div className={key._id} hidden={false}>
                        {key['MaKho']}{" "}
                    </div>
                    <TextArea
                        className={key._id + "hidden"}
                        hidden={true}
                        onChange={HandleChange}
                        name="MaKho"
                        value={key['MaKho']}
                    />
                </td>
                <td>
                    <div className={key._id} hidden={false}>
                        {key.TenKho}
                    </div>
                    <TextArea
                        className={key._id + "hidden"}
                        hidden={true}
                        onChange={HandleChange}
                        name="TenKho"
                        value={key.TenKho}
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
                        name="TenKho"
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
                        name="TenKho"
                        value={key.SDT}
                    />
                </td>
                <td>
                    <div className={cx("dateImport")}>{key.NgayTao}</div>
                </td>
                <td hidden={valuehidden}>
                    <DropdownSetting
                        HandleDelete={() =>
                            HandleDelete(
                                key.MaKho,
                                "deleteWarehouse",
                                RequestRenderTable,
                                filters,
                                setData,
                                "WareHousePage"
                            )
                        }
                        handleEdit={() => HandleEdit(key._id, setIdItem)}
                    />
                </td>
                <td className={key._id + "hidden"} hidden={true}>
                    <Button
                        variant="secondary"
                        onClick={() => CancelEdit(key._id, setIdItem)}
                    >
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
                            "KhoHang"
                        )}>
                        <BiEdit /></Button>{" "}
                </td>
            </tr>
        </>
    )) :  Data?.map((key) => (
        <>
        <tr>
            <td>
                <div className={key._id} hidden={false}>
                    {key['MaKho']}{" "}
                </div>
                <TextArea
                    className={key._id + "hidden"}
                    hidden={true}
                    onChange={HandleChange}
                    name="MaKho"
                    value={key['MaKho']}
                />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.TenKho}
                </div>
                <TextArea
                    className={key._id + "hidden"}
                    hidden={true}
                    onChange={HandleChange}
                    name="TenKho"
                    value={key.TenKho}
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
                    name="TenKho"
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
                    name="TenKho"
                    value={key.SDT}
                />
            </td>
            <td>
                <div className={cx("dateImport")}>{key.NgayTao}</div>
            </td>
            <td hidden={valuehidden}>
                <DropdownSetting
                    HandleDelete={() =>
                        HandleDelete(
                            key.MaKho,
                            "deleteWarehouse",
                            RequestRenderTable,
                            filters,
                            setData,
                            "WareHousePage"
                        )
                    }
                    handleEdit={() => HandleEdit(key._id, setIdItem)}
                />
            </td>
            <td className={key._id + "hidden"} hidden={true}>
                <Button
                    variant="secondary"
                    onClick={() => CancelEdit(key._id, setIdItem)}
                >
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
                        "KhoHang"
                    )}>
                    <BiEdit /></Button>{" "}
            </td>
        </tr>
    </>
    ))
    return <tbody>{datatable}</tbody>;
}
export { TableWareHouse }