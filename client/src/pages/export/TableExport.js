import React from 'react'
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


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
        <tbody>
            <tr>
                <td><Form.Control className="mb-3" as="textarea" type="text"/></td>
                <td><Form.Control className="mb-3" as="textarea" type="text"/></td>
                <td><Form.Control className="mb-3" as="textarea" type="text"/></td>
                <td><Button type='button' variant="danger">Delete</Button></td>
            </tr>
            {datatable}
        </tbody>
    );
};
const THeadtable = () => {
    return (
        <thead>
            <tr>
                <th>Name Product</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>
                    <Button type='button' variant="danger">Add</Button>
                </th>
            </tr>
        </thead>
    );
};
export default TableExport