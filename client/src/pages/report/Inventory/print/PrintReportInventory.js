import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../set_formData/SetData";
import Table from "react-bootstrap/Table";
// import SetData from "../../set_formData/SetData"
const PrintReportInventory = (props) => {
  const {hidden} = props
  return (
    // <SetData>
      <TableInventory hidden={hidden} />
    // </SetData>
  )
}
const TableInventory = (props) => {
  const {hidden} = props

  // const context = useContext(DataContext)
  return (
    <>
      <Table hidden={hidden}>
        <THeadtable />
        {/* <TBodytable DataProduct={DataProduct} /> */}
      </Table>
    </>
  )
}
const THeadtable = (props) => {
  const {hidden} = props
 
  return (
    <thead>
      <tr>
        <th>ID Product</th>
        <th>Name Product</th>
        <th>ID Warehouse</th>
        <th>Color</th>
        <th>Unit</th>
        <th>Quantity</th>
        <th>Retail price</th>
        <th>Stock status</th>
        {/* <th>Action</th> */}
      </tr>
    </thead>
  )
}
const TBodytable = (props) => {
  const { DataProduct } = props

  const datatable = DataProduct.map((key) =>
  (
    <tr key={key.MaLK}>
      <td>{key.MaLK}</td>
      <td>{key.TenLK}</td>
      <td>{key.MaKho}</td>
      <td>{key.Color}</td>
      <td>{key.Donvi}</td>
      <td>{key.Soluong}</td>
      <td>{key.GiaBanLe.toLocaleString()}</td>
      <td>{key.TinhTrangHang}</td>
    </tr>
  )
  )
  return (
    <tbody>{datatable}</tbody>
  )
}
export default PrintReportInventory