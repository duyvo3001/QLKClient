import { React, useState, useEffect } from 'react'
import Table from "react-bootstrap/Table";
import { RequestRenderTable } from '../Import/table/ActionFunction/RequestRenderTable';
import "./table.style.scss"
import { AiOutlinePrinter, AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri"
import { HandleDelete } from '../Import/table/ActionFunction/HandleDelete';

import Button from 'react-bootstrap/esm/Button';
const OrderTableView = (props) => {
    const { filters, searchBox } = props;
    return (
        <Table striped bordered hover>
            <THeadtable />
            <TBodytable searchBox={searchBox} filters={filters} />
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
                <th>Action</th>
            </tr>
        </thead>
    );
}
const TBodytable = (props) => {

    const [Data, setData] = useState(null);
    const { filters, searchBox } = props;

    useEffect(() => {
        if (searchBox?.length !== 0 && searchBox?.length !== undefined)
            setData(searchBox)
        else
            RequestRenderTable(filters, setData, "HomePaid");
    }, [filters,searchBox]);

    function deletePaid(IDPaidOrder, DeleteOrder, RequestRenderTable, filters, setData, HomePaid) {
        HandleDelete(IDPaidOrder, DeleteOrder, RequestRenderTable, filters, setData, HomePaid)
    }

    const datatable = Data?.data?.result !== undefined ? Data?.data.result?.map((key) => (
        <tr>
            <td>
                <div className={key._id}>
                    {key.IDPaidOrder}{" "}
                </div>
            </td>
            <td>
                <div className={key._id}>
                    {key.IDCustomer}{" "}
                </div>
            </td>
            <td>
                <div className={key._id}>
                    {key.Discount}{" "} %
                </div>
            </td>
            <td>
                <div className={key._id} >
                    <div className="scroll-bar">
                        {key.Product.map((index) => {
                            return <div>
                                {index.NameProduct} x {index.Qty}
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
            <td>
                <Button className='mb-3' href={'Invoice' + "/" + key.IDPaidOrder}><AiOutlinePrinter /></Button>
                <Button className='mb-3' variant='warning'><AiOutlineEdit /></Button>
                <Button className='mb-3'
                    onClick={() =>
                        HandleDelete(
                            key.IDPaidOrder,
                            "DeleteOrder",
                            RequestRenderTable,
                            filters, setData,
                            "HomePaid")
                    }
                    variant='danger'>
                    <RiDeleteBin2Line />
                </Button>
            </td>
        </tr>
    )) : Data?.map((key) => (<tr>
        <td>
            <div className={key._id}>
                {key.IDPaidOrder}{" "}
            </div>
        </td>
        <td>
            <div className={key._id}>
                {key.IDCustomer}{" "}
            </div>
        </td>
        <td>
            <div className={key._id}>
                {key.Discount}{" "} %
            </div>
        </td>
        <td>
            <div className={key._id} >
                <div className="scroll-bar">
                    {key.Product.map((index) => {
                        return <div>
                            {index.NameProduct} x {index.Qty}
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
        <td>
            <Button className='mb-3' href={'Invoice' + "/" + key.IDPaidOrder}><AiOutlinePrinter /></Button>
            <Button className='mb-3' variant='warning'><AiOutlineEdit /></Button>
            <Button className='mb-3'
                onClick={() =>
                    HandleDelete(
                        key.IDPaidOrder,
                        "DeleteOrder",
                        RequestRenderTable,
                        filters, setData,
                        "HomePaid")
                }
                variant='danger'>
                <RiDeleteBin2Line />
            </Button>
        </td>
    </tr>))

    return (
        <tbody>{datatable}</tbody>
    )
}
export default OrderTableView