import { React, useState, useEffect } from 'react'
import Table from "react-bootstrap/Table";
import { RequestRenderTable } from '../Import/table/ActionFunction/RequestRenderTable';
import "./table.style.scss"
const OrderTableView = (props) => {
    const { filters } = props;
    return (
        <Table striped bordered hover>
            <THeadtable />
            <TBodytable filters={filters} />
        </Table>
    );
}
const THeadtable = () => {
    return (
        <thead>
            <tr>
                <th>ID Paid Order</th>
                <th>Customer</th>
                <th>Discount</th>
                <th>Total Product - Qty</th>
                <th>Date</th>
            </tr>
        </thead>
    );
}
const TBodytable = (props) => {
    const [Data, setData] = useState(null);
    const [formData, setFormData] = useState({});
    const [_idItem, setIdItem] = useState(null);
    const { filters } = props;

    useEffect(() => {
        RequestRenderTable(filters, setData, "HomePaid");
    }, [filters]);

    const HandleChange = (event) => {
        const { name, value } = event.target;
        const _id = _idItem;
        setFormData({ ...formData, [name]: value, _id });
    };

    const datatable = Data?.data.result?.map((key) => (
        <tr>
            <td>
                <div className={key._id}>
                    {key.IDPaidOrder}{" "}
                </div>
            </td>
            <td>
                <div className={key._id}>
                    {key.searchCustomer}{" "}
                </div>
            </td>
            <td>
                <div className={key._id}>
                    {key.Discount}{" "}
                </div>
            </td>
            <td>
                <div className={key._id} >
                    <div className="scroll-bar">
                        {key.Product.map((index) => {
                            return <div>
                                {index.NameProduct} - {index.Qty}
                            </div>
                        })}{" "}
                    </div>
                </div>
            </td>
            <td>
                <div className={key._id}>
                    {key.Date}{" "}
                </div>
            </td>
        </tr>
    ))

    return (
        <tbody>{datatable}</tbody>
    )
}
export default OrderTableView