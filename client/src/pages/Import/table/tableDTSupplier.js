import Request from '../../../api/Request'
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import DropdownSetting from '../../Import/table/DropdownSetting'

function tableDTSupplier(props) {
    const {filters } = props;
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
                <th>ID Supplier</th>
                <th>Name Supplier</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
        </thead>
    )
}
//render table body
const TBodytable = (props) => {

    const [Data, setData] = useState(null);
    const {filters } = props;
    const requestRenderTable = (filters) => {
        Request.get(`/HomeSupplier/${filters?.page}`, {
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
        key => <tr>
            <td>{key.MaNCC}</td>
            <td>{key.TenNCC}</td>
            <td>{key.DiaChi}</td>
            <td>{key.SDT}</td>
            <td>{key.Email}</td>
            <td><DropdownSetting handleDelete={() => handleDelete(key.MaNCC, "deleteSupplier")}/></td>
        </tr>
    )

    return (
        <tbody>
            {datatable}
        </tbody>
    )

}

export { tableDTSupplier }