import React from 'react'
import Table from "react-bootstrap/Table";

const TableInventory = () => {
    return (
        <>
            <Table>
                <THeadtable />
                <TBodytable />
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
                <th>Name Product</th>
            </tr>
        </thead>
    )
}

const TBodytable = () => {
    return (
        <tbody>
            <tr>
                <td>hello</td>
                <td>hello</td>
                <td>hello</td>
            </tr>
        </tbody>
    )
}
export default TableInventory