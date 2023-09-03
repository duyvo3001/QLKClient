import React from 'react'
import Table from "react-bootstrap/Table";

const OutOfStockTable = (props) => {
  const { DataProduct } = props
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
        <th>Quantity</th>
        <th>Unit</th>
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

      <td>{key.Soluong}</td>
      <td>{key.TinhTrangHang}</td>
    </tr>
  )
  )
  return (
    <tbody>{datatable}</tbody>
  )
}
export default OutOfStockTable