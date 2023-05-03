import React from 'react'
import Table from "react-bootstrap/Table";

const TableExport = (props) => {
    const { Data } = props
    return (
        <Table striped bordered hover>
            <THeadtable />
            <TBodytable Data={Data} />
        </Table>
    )
}
const TBodytable = (props) => {
    const { Data } = props
    const datatable = Data?.map((key) => (
        <tr>
            <td>
                <div className={key._id}>
                    {key.MaLK}{" "}
                </div>
            </td>
            <td>
                <div className={key._id} >
                    {key.TenLK}{" "}
                </div>
            </td>
            <td>
                <div className={key._id} >
                    {key.MaThuongHieu}{" "}
                </div>
            </td>
            <td>
                <div className={key._id} >
                    {key.MaKho}{" "}
                </div>
            </td>
            <td>
                <div className={key._id} >
                    {key.MaNCC}{" "}
                </div>
            </td>
            <td>
                <div className={key._id} >
                    {key.Color}{" "}
                </div>
            </td>
            <td>
                <div className={key._id} >
                    {key.Donvi}{" "}
                </div>
            </td>
            <td>
                <div className={key._id} >
                    {key.Soluong}{" "}
                </div>
            </td>
            <td>
                <div className={key._id} >
                    {key.GiaBanLe}{" "}
                </div>
            </td>
            <td>
                <div className={key._id} >
                    {key.NgayNhap}{" "}
                </div>
            </td>
            <td>
                <div className={key._id} >
                    {key.NgayXuat}{" "}
                </div>
            </td>
            <td>
                <div className={key._id} >
                    {key.TinhTrangHang}{" "}
                </div>
            </td>
        </tr>
    ))
    return (
        <tbody>{datatable}</tbody>
    );
};
const THeadtable = () => {
    return (
        <thead>
            <tr>
                <th>ID Product</th>
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
    );
};
export default TableExport