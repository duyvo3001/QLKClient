import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import DropdownSetting from "../../Import/table/DropdownSetting";
import { HandleDelete } from "./ActionFunction/HandleDelete";
import { RequestRenderTable } from "./ActionFunction/RequestRenderTable";
import { HandleEdit } from "./ActionFunction/HandleEdit";
import Button from "react-bootstrap/Button";
import { UpdateEdit } from "./ActionFunction/UpdateEdit";
import { CancelEdit } from "./ActionFunction/CancelEdit";
import { TextArea } from "./TextArea";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { ConvertDatetime } from "../../../components/convertDateTime/DateTimeConvert"
import { Navigate } from 'react-router-dom';

function TableDT(props) {
    const { filters, valuehidden, searchBox } = props;
    return (
        <Table hover>
            <THeadtable valuehidden={valuehidden} />
            <TBodytable filters={filters} valuehidden={valuehidden} searchBox={searchBox} />
        </Table>
    );
}
//render table
const THeadtable = (props) => {
    const { valuehidden } = props;
    return (
        <thead>
            <tr>
                <th>ID Product</th>
                <th>Category</th>
                <th>Name Product</th>
                <th>ID Brand</th>
                <th>ID Warehouse</th>
                <th>ID Supplier</th>
                <th>Color</th>
                <th>Unit</th>
                <th>Quantity</th>
                <th>Retail price</th>
                <th>Day Import</th>
                <th>Stock status</th>
                <th hidden={valuehidden}>Action</th>
            </tr>
        </thead>
    );
};

//render table body
const TBodytable = (props) => {
    const [Data, setData] = useState(null);
    const [formData, setFormData] = useState({});
    const [_idItem, setIdItem] = useState(null);
    const { filters, valuehidden, searchBox } = props;
    //request render table

    useEffect(() => { // check if checkbox is !== 0 and !== undefined 
        if (searchBox?.length !== 0 && searchBox?.length !== undefined) {
            setData(searchBox)
        }
        else { // Render full data table
            RequestRenderTable(filters, setData, "ImportStock");
        }
    }, [filters, searchBox]);

    const HandleChange = (event) => { // Render when input in table is changed
        const { name, value } = event.target;
        const _id = _idItem;
        setFormData({ ...formData, [name]: value, _id });
    };
    const HandelClickTR = (MaLK) => {
        return <Navigate to="/" />
    }
    //Render table when searchbox changes and if searchbox null render full data table
    const datatable = Data?.data?.result !== undefined ? Data?.data?.result?.map((key) => (
        <tr key={key.MaLK} name="MaLK" value={key.MaLK} onClick={() => HandelClickTR(key.MaLK)}>
            <td>
                <div>{key.MaLK}{" "}</div>
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key?.Category}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="Category" value={key?.Category} />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.TenLK}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="TenLK" value={key.TenLK} />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.MaThuongHieu}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="MaThuongHieu" value={key.MaThuongHieu} />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.MaKho}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="MaKho" value={key.MaKho} />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.MaNCC}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="MaNCC" value={key.MaNCC} />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.Color}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="Color" value={key.Color} />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.Donvi}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="Donvi" value={key.Donvi} />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.Soluong}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="Soluong" value={key.Soluong} />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.GiaBanLe}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="GiaBanLe" value={key.GiaBanLe} />
            </td>
            <td>
                <div>
                    {ConvertDatetime(key.NgayNhap)}{" "}
                </div>
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.TinhTrangHang}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="TinhTrangHang" value={key.TinhTrangHang} />
            </td>
            <td hidden={valuehidden}>
                <DropdownSetting
                    handleEdit={() => HandleEdit(key._id, setIdItem)}
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
                />
            </td>
            <td className={key._id + "hidden"} hidden={true}>
                <Button variant="warning" onClick={
                    () => UpdateEdit(
                        key._id,
                        formData,
                        setIdItem,
                        CancelEdit,
                        RequestRenderTable,
                        filters,
                        setData,
                        "Stock"
                    )}>
                    <BiEdit /></Button>{" "}
                <Button
                    variant="secondary"
                    onClick={() => CancelEdit(key._id, setIdItem)}>
                    <AiOutlineCloseCircle />
                </Button>{" "}
            </td>
        </tr>
    )) : Data?.map((key) => (
        <tr key={key.MaLK}>
            <td>
                <div className={key._id} hidden={false}>
                    {key.MaLK}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="MaLK" value={key.MaLK} />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.TenLK}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="TenLK" value={key.TenLK} />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.MaThuongHieu}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="MaThuongHieu" value={key.MaThuongHieu} />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.MaKho}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="MaKho" value={key.MaKho} />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.MaNCC}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="MaNCC" value={key.MaNCC} />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.Color}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="Color" value={key.Color} />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.Donvi}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="Donvi" value={key.Donvi} />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.Soluong}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="Soluong" value={key.Soluong} />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.GiaBanLe}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="GiaBanLe" value={key.GiaBanLe} />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.NgayNhap}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="NgayNhap" value={key.NgayNhap} />
            </td>
            <td>
                <div className={key._id} hidden={false}>
                    {key.TinhTrangHang}{" "}
                </div>
                <TextArea className={key._id + "hidden"} hidden={true}
                    onChange={HandleChange} name="TinhTrangHang" value={key.TinhTrangHang} />
            </td>
            <td hidden={valuehidden}>
                <DropdownSetting
                    handleEdit={() => HandleEdit(key._id, setIdItem)}
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
                />
            </td>
            <td className={key._id + "hidden"} hidden={true}>
                <Button variant="warning" onClick={
                    () => UpdateEdit(
                        key._id,
                        formData,
                        setIdItem,
                        CancelEdit,
                        RequestRenderTable,
                        filters,
                        setData,
                        "Stock"
                    )}>
                    <BiEdit /></Button>{" "}
                <Button
                    variant="secondary"
                    onClick={() => CancelEdit(key._id, setIdItem)}>
                    <AiOutlineCloseCircle />
                </Button>{" "}
            </td>
        </tr>
    ))

    return <tbody>{datatable}</tbody>;
};
export { TableDT };
