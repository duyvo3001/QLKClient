import { useState, useEffect } from "react";
import Request from '../../../api/Request'
import Table from 'react-bootstrap/Table';
import DropdownSetting from '../../Import/table/DropdownSetting'

function tableDTBrand() {
    return (
        <Table striped bordered hover>
            <THeadtable />
            <TBodytable />
        </Table>
    )
}
//render table
const THeadtable = () => {
    return (
        <thead>
            <tr>
                <th>ID Brand</th>
                <th>Name Brand</th>
                <th>Action</th>
            </tr>
        </thead>
    )
}
//render table body
const TBodytable = () => {

    const [Data, setData] = useState(null);
    useEffect(() => {
        Request.get('/HomeBrand', {
            headers: { 'Authorization': sessionStorage.getItem("access_token") }
        })
            .then(response => setData(response))
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    const datatable = Data?.data.result?.map(
        key => <tr>
            <td>{key.MaThuongHieu}</td>
            <td>{key.TenThuongHieu}</td>
            <td><DropdownSetting /></td>
        </tr>
    )

    return (
        <tbody>
            {datatable}
        </tbody>
    )

}

export { tableDTBrand }