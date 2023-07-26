import React from 'react'
import Table from "react-bootstrap/Table";

const InventoryList = () => {
    return (
        <>
        <h4 className="mb-3">Inventory List</h4>
            <Table hover>
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
                <th>Category</th>
                <th>Quantity</th>
                <th>Retail price</th>
                <th>Day Export</th>
                <th>Day Import</th>
                <th>Stock status</th>
            </tr>
        </thead>
    );
};

const TBodytable = () => { }

export default InventoryList