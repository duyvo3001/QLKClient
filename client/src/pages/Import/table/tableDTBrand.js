import { useState, useEffect } from "react";
import Request from '../../../api/Request'
import Table from 'react-bootstrap/Table';
import DropdownSetting from '../../Import/table/DropdownSetting'
import classnames from 'classnames/bind'
import * as style from '../../Import/table/TableDTBrand.module.scss'

const cx = classnames.bind(style)

function tableDTBrand(props) {
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
                <th>ID Brand</th>
                <th>Name Brand</th>
                <th>Date Import</th>
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
        Request.get(`/HomeBrand/${filters?.page}`, {
            headers: { 'Authorization': sessionStorage.getItem("access_token") }
        })
            .then(response => setData(response))
            .catch(function (error) {
                console.log(error);
            });
    }

    //request render table State
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
    const handlEdit =()=>{
        
    }
    //handle data table
    const datatable = Data?.data.result?.map(
        key => <tr>
            <td key={key.MaThuongHieu}>{key.MaThuongHieu}</td>
            <td key={key.TenThuongHieu}>{key.TenThuongHieu}</td>
            <td >
                <div className={cx("dateImport")} >{key.NgayNhap}</div>
                <textarea  >{key.NgayNhap}
                </textarea>
            </td>
            <td>
                <DropdownSetting
                    handleDelete={() => handleDelete(key.MaThuongHieu, "deleteBrand")} />
            </td>
        </tr>
    )

    return (
        <tbody>
            {datatable}
        </tbody>
    )

}

export { tableDTBrand }