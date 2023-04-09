import { useState, useEffect } from "react";
import Request from '../../../api/Request'
import Table from 'react-bootstrap/Table';
import DropdownSetting from '../../Import/table/DropdownSetting'
import classnames from 'classnames/bind'
import * as style from '../../Import/table/TableDTBrand.module.scss'
import Button from 'react-bootstrap/Button';
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

    const { filters } = props;
    const [Data, setData] = useState(null);
    const [formData, setFormData] = useState({});
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

    const HandleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = (MaTH, TenTH) => {
        const nameTextareaMaTH = document.getElementsByName(MaTH)// dang true
        const nameTextareaTenTH = document.getElementsByName(TenTH)// dang true
        const divTextMaTH = document.getElementsByClassName(MaTH)//dang false
        const divTextTenTH = document.getElementsByClassName(TenTH)//dang false
        for (let i = 0; i < nameTextareaMaTH.length; i++) {
            nameTextareaMaTH[i].hidden = false;
        }
        for (let i = 0; i < nameTextareaTenTH.length; i++) {
            nameTextareaTenTH[i].hidden = false;
        }
        for (let i = 0; i < divTextMaTH.length; i++) {
            divTextMaTH[i].hidden = true;
        }
        for (let i = 0; i < divTextTenTH.length; i++) {
            divTextTenTH[i].hidden = true;
        }
    }
    const cancelEdit = (ID) => {
        const nameTextarea = document.getElementsByName(ID)// dang true
        const divText = document.getElementsByClassName(ID)//dang false
        for (let index = 0; index < nameTextarea.length; index++) {
            nameTextarea[index].hidden = true;
        }
        for (let index = 0; index < divText.length; index++) {
            divText[index].hidden = false;
        }
    }

    const UpdateEdit = () => {
        Request.post(
            '/editBrand',
            { formData },
            { headers: { Authorization: sessionStorage.getItem("access_token") } }
          )
          .then(requestRenderTable(filters))
          .catch((error) => {
            console.log(error);
          });
    }
    //handle data table
    const datatable = Data?.data.result?.map(
        key => <>
            <tr>
                <td >
                    <div className={key.MaThuongHieu} hidden={false}>{key.MaThuongHieu} </div>
                    <textarea hidden={true} onChange={HandleChange} name={key.MaThuongHieu}>
                        {key.MaThuongHieu}
                    </textarea>
                </td>
                <td >
                    <div className={key.MaThuongHieu} hidden={false} >{key.TenThuongHieu}</div>
                    <textarea hidden={true} onChange={HandleChange} name={key.TenThuongHieu}>
                        {key.TenThuongHieu}
                    </textarea>
                </td>
                <td>
                    <div className={cx("dateImport")} >{key.NgayNhap}</div>
                </td>
                <td>
                    <DropdownSetting
                        handleDelete={() => handleDelete(key.MaThuongHieu, "deleteBrand")}
                        handleEdit={() => handleEdit(key.MaThuongHieu,key.TenThuongHieu)}
                    />
                </td>
                <td hidden={true} name={key.MaThuongHieu} >
                    <Button variant="secondary" onClick={() => cancelEdit(key.MaThuongHieu,key.TenThuongHieu)}>cancel</Button>{' '}
                    <Button variant="warning" onClick={UpdateEdit}>update</Button>{' '}
                </td>
            </tr>
        </>
    )

    return (
        <tbody>
            {datatable}
        </tbody>
    )

}

export { tableDTBrand }