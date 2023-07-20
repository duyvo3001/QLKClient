import React from 'react'
import Table from "react-bootstrap/Table";

const TableInventory = (props) => {
    const {DataProduct} = props
    return (
        <>
            <Table>
                <THeadtable />
                <TBodytable DataProduct={DataProduct} />
            </Table>
        </>
    )
}
const THeadtable = () => {
    return (
        <thead>
            <tr>
                <th>ID Product</th>
                <th>Name Product</th>
                <th>Color</th>
                <th>Unit</th>
                <th>Quantity</th>
                <th>Retail price</th>
                <th>Day Import</th>
                <th>Stock status</th>
                <th>Action</th>
            </tr>
        </thead>
    )
}

const TBodytable = (props) => {
    const {DataProduct} = props

    const datatable = DataProduct.map((key) => 
    (
        <tr>
                <td>{key.MaLK}</td>
                <td>{key.TenLK}</td>
                <td>{key.Color}</td>
                <td>{key.Donvi}</td>
                <td>{key.Soluong}</td>
                <td>{key.GiaBanLe}</td>
                <td>{key.NgayNhap}</td>
                <td>{key.TinhTrangHang}</td>
                <td></td>
            </tr>
    )
    )
    return (
        <tbody>{datatable}</tbody>
    )
}
export default TableInventory