import React from 'react'
import Table from "react-bootstrap/Table";

const TableSale = (props) => {
    const { DataInvoice } = props
    return (
        <>
            <Table>
                <THeadtable />
                <TBodytable DataInvoice={DataInvoice} />
            </Table>
        </>
    )
}

const THeadtable = () => {
    return (
        <thead>
            <tr>
                <th>ID Export Order</th>
                <th>Customer</th>
                <th>Discount</th>
                <th>Total Product - Qty</th>
                <th>Net Amount</th>
                <th>Date</th>
            </tr>
        </thead>
    )
}
const TBodytable = (props) => {
    const { DataInvoice } = props
    const datatable = DataInvoice.map((key) => (
        <tr>
            <td> {key.IDPaidOrder}{" "}</td>
            <td> {key.IDCustomer}{" "}</td>
            <td> {key.Discount}{" "} %</td>
            <td>{key.Product.map((index) => {
                return <div>
                    {index.NameProduct} x {index.Qty}
                </div>
            })}{" "}</td>
            <td> {key.NetAmount?.toLocaleString()}{" "}</td>
            <td> {key.Date?.toLocaleString()}{" "}</td>
        </tr>
    ))
    return (
        <tbody>
            {datatable}
        </tbody>
    )
}
export default TableSale