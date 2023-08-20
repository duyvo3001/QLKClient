import { Button, TextField } from '@mui/material';
import React from 'react'
import Table from "react-bootstrap/Table";

const InventoryTable = () => {
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
                <th>Quantity</th>
                <th>Adjust Quantity</th>
                <th>Total</th>
            </tr>
        </thead>
    );
};

const TBodytable = () => {
    return (
        <>
            <tbody>
                <tr>
                    <td>hello</td>
                    <td>3</td>
                    <td><TextField
                        id="outlined-number"
                        type="number"
                        size='small'
                        sx={{ width: 100 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    /></td>
                </tr>
            </tbody>
        </>
    )
}

export default InventoryTable