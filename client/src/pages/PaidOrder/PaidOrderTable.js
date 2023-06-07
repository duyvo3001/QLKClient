import { React, useContext } from 'react'
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { DataOnchange } from './PaidOrderPage';
const PaidOrderTable = () => {
    const RenderTable = useContext(DataOnchange)

    function addTable() {
        RenderTable.setRender([...RenderTable.Render, {
            ID: RenderTable.Render.length + 1,
            NameProduct: "",
            Qty: 0
        }])
    }

    function DeleteTable(ID) {
        RenderTable.setRender(RenderTable.Render.filter(table => table.ID !== ID))
    }

    return (
        <Table striped bordered hover>
            <THeadtable addTable={addTable} />
            <TBodytable DeleteTable={DeleteTable} />
        </Table>
    )
}
const TBodytable = (props) => {
    const { DeleteTable } = props
    const RenderTable = useContext(DataOnchange)

    const onSearch = (Product) => { //set value onsearch
        const name = 'searchCustomer';
        const value = Product
        RenderTable.setRender([...RenderTable.Render, {
            ID: RenderTable.Render.length + 1,
            NameProduct: "",
            Qty: 0
        }])
        const test = document.getElementsByName(name)
        for (let i = 0; i < test.length; i++) {
            test[i].value = Product;
        }
    }

    function RenderSuggestion(Value, Data, onSearch, ID, CheckID) {
        // eslint-disable-next-line eqeqeq
        if (CheckID == ID)// render when  ID = id form state change
            return (
                Data?.data?.result
                    ?.filter((key) => {
                        const searchTerm = Value?.toLowerCase();
                        const MaLK = key.MaLK?.toLowerCase();
                        return searchTerm && MaLK?.startsWith(searchTerm) && MaLK !== searchTerm
                    })
                    ?.map((key) => (
                        <div className="dropdowntable-row" key={key.MaLK} target="-blank"
                            onClick={
                                () => {
                                    onSearch(key.MaLK)
                                    // const test = document.getElementById(ID)
                                    // return test.value = key.MaLK
                                }
                            }
                        >
                            <div>{key.MaLK}</div>
                        </div>
                    ))
            )
    }
    return (
        <tbody>
            {
                RenderTable?.Render?.map((index) => (
                    <tr>
                        <td>
                            <Form.Control name={"search" + index.ID} id={index.ID} className="mb-3" onClick={()=>RenderTable.Onchangeform}/>
                            <div className="dropdowntable">
                                {
                                    RenderSuggestion(RenderTable.DataProduct, onSearch, index.ID, CheckID)
                                }
                            </div>
                        </td>
                        <td><Form.Control className="mb-3" type="text" /></td>
                        <td><Form.Control className="mb-3" type="text" disabled /></td>
                        <td><Form.Control className="mb-3" type="text" disabled /></td>
                        <td>
                            <Button type='button'
                                onClick={() => DeleteTable(index.ID)} variant="danger">Delete</Button>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    )
}
const THeadtable = (props) => {
    const { addTable } = props
    return (
        <thead>
            <tr>
                <th>Name Product</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>
                    <Button type='button' onClick={addTable} variant="danger">Add</Button>
                </th>
            </tr>
        </thead>
    );
};
export default PaidOrderTable