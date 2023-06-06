import {React,useContext} from 'react'
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const PaidOrderTable = () => {
    return (
        <Table striped bordered hover>
            <THeadtable />
            <TBodytable />
        </Table>
    )
}
const TBodytable = () => {
    const theme = useContext();
    return (
        <tbody>
            {
                <tr>
                    <td>
                        <Form.Control />
                        <div className="dropdowntable">
                        </div>
                    </td>
                    <td><Form.Control className="mb-3" type="text" /></td>
                    <td><Form.Control className="mb-3" type="text" disabled /></td>
                    <td><Form.Control className="mb-3" type="text" disabled /></td>
                    <td><Button type='button' variant="danger">Delete</Button></td>
                </tr>
            }
        </tbody>
    )
}
const THeadtable = () => {
    return (
        <thead>
            <tr>
                <th>Name Product</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>
                    <Button type='button'  variant="danger">Add</Button>
                </th>
            </tr>
        </thead>
    );
};
export default PaidOrderTable