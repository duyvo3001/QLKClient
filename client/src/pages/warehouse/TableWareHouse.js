import { React ,useState, useEffect } from "react";
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
const cx = classnames.bind(style);
const TableWareHouse = (props) => {
    const { filters } = props;
    return (
        <Table striped bordered hover>
            <THeadtable />
            <TBodytable filters={filters} />
        </Table>
    );
}
const THeadtable =()=>{
    return (
        <thead>
            <tr>
                <th>ID Warehouse</th>
                <th>Name Warehouse</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Date Import</th>
                <th>Action</th>
            </tr>
        </thead>
    );
}
const TBodytable =(props)=>{
    const { filters } = props;
    const [Data, setData] = useState(null);
    const [formData, setFormData] = useState({});
    const [_idItem, setIdItem] = useState(null);
    //request render table State
    useEffect(() => {
        RequestRenderTable(filters, setData, "WareHousePage");
    }, [filters]);

    // handle text area change events
    const HandleChange = (event) => {
        const { name, value } = event.target;
        const _id = _idItem;
        setFormData({ ...formData, [name]: value, _id });
    };

    //handle data table
    const datatable = Data?.data.result?.map((key) => (
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
                <td>
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
                        cancel
                    </Button>{" "}

                    <Button variant="warning" onClick={
                        () => UpdateEdit( 
                            key._id ,
                            formData ,
                            setIdItem,
                            CancelEdit,
                            RequestRenderTable,
                            filters,
                            setData,
                            "KhoHang"
                            )}>
                    update</Button>{" "}
                </td>
            </tr>
        </>
    ));
    return <tbody>{datatable}</tbody>;
}
export { TableWareHouse}