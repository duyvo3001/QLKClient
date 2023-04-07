import { useState, useEffect } from "react";
import Request from '../../../api/Request'
import Table from 'react-bootstrap/Table';
import DropdownSetting from '../../Import/table/DropdownSetting'
function TableDT(props) {
    const { filters } = props;
    return (
        <Table striped bordered hover>
            <THeadtable />
            <TBodytable filters={filters} />
        </Table>
    )
}
//render table
const THeadtable = () => {
    return (
        <thead>
            <tr>
                <th>ID Stock</th>
                <th>Name Stock</th>
                <th>ID Brand</th>
                <th>ID Warehouse</th>
                <th>ID Supplier</th>
                <th>Color</th>
                <th>Unit</th>
                <th>Quantity</th>
                <th>Retail price</th>
                <th>Day Export</th>
                <th>Day Import</th>
                <th>Stock status</th>
                <th>Action</th>
            </tr>
        </thead>
    )
}


//render table body
const TBodytable = (props) => {

    const [Data, setData] = useState(null);
    const { filters } = props;
    //request render table 
    const requestRenderTable = (filters) => {
        Request.get(`/ImportStock/${filters?.page}`, {
            headers: { 'Authorization': sessionStorage.getItem("access_token") }
        })
            .then(response => setData(response))
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => {
        requestRenderTable(filters)
    }, [filters])
    // handle delete
    const handleDelete = (ID, PostUrl) => {
        Request
            .post(`/${PostUrl}/${ID}`, {},
                {
                    headers: { Authorization: sessionStorage.getItem("access_token") }
                })
            .then(requestRenderTable(filters))
            .catch(eror => { console.error(eror) })
    }
    const datatable = Data?.data.result?.map(
        key => (<tr>
            <td>{key.MaLK}</td>
            <td>{key.TenLK}</td>
            <td>{key.MaThuongHieu}</td>
            <td>{key.MaKho}</td>
            <td>{key.MaNCC}</td>
            <td>{key.Color}</td>
            <td>{key.Donvi}</td>
            <td>{key.GiaBanLe}</td>
            <td>{key.Soluong}</td>
            <td>{key.NgayNhap}</td>
            <td>{key.NgayXuat}</td>
            <td>{key.TinhTrangHang}</td>
            <td>
                <DropdownSetting handleDelete={() => handleDelete(key.MaLK, "deleteStock")} />
            </td>
        </tr>)
    )

    return (
        <tbody>
            {datatable}
        </tbody>
    )
}
export { TableDT }