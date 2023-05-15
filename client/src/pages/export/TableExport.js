import React from 'react'
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

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
                <div className={key._id} >
                    {key.TenLK}{" "}
                </div>
            </td>
            <td>
                <div className={key._id} >
                    {key.Color}{" "}
                </div>
            </td>
            <td>
                <div className={key._id} >
                    {key.Soluong}{" "}
                </div>
            </td>
            <td>
                <Button type='button' variant="danger">delete</Button>
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
                <th>Name Product</th>
                <th>Color</th>
                <th>Quantity</th>
                <th>Action</th>
            </tr>
        </thead>
    );
};
export default TableExport