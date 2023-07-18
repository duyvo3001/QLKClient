import { React, useContext } from 'react'
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import { RiDeleteBin7Line } from "react-icons/ri";
import { SiAddthis } from "react-icons/si";
import Form from 'react-bootstrap/Form';
import { DataOnchange } from './PaidOrderPage';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const PaidOrderTable = () => {
    const RenderTable = useContext(DataOnchange)

    const updateAmount = (ID, Qty, Product) => { // Update amount
        const setNameProduct = document.getElementsByName("Amount" + ID)
        let Rate = 0;
        RenderTable.DataProduct?.map((key) => {
            return Product === key.label ? Rate = key.GiaBanLe : 0
        })
        const numberAmount = Rate * Qty
        setNameProduct[0].value = numberAmount?.toLocaleString()
    }

    const OnchangeQty = (event) => { // Update Qty 
        const { name, value } = event.target;
        let Product = "";

        const updateRender = RenderTable.Render?.map((key, index) => {// setvalue for Render
            if (event.target.id - 1 === index) {
                Product = key.NameProduct;
                return {
                    ID: +event.target.id,
                    NameProduct: key.NameProduct,
                    Qty: value,
                    MaxQty: key.MaxQty
                }
            }
            else {
                return key
            }
        })
        RenderTable.setRender(updateRender);
        updateAmount(event.target.id, value, Product);
    }

    const Onchangeformtable = async (event, newvalue) => { // when click and when type change event
        if (newvalue) {// click event
            const text1 = event.target.id;
            const parts = text1.split("-");
            const result = parts[0];

            // update Max QTY
            let Soluong = updateQTY(newvalue)

            // update Render
            await RenderTable.setRender(updateRender(result, newvalue, Soluong)); // update table Render 

            //handle Rate
            updateRate(result, newvalue)
            // update Name
            updateNameProduction(result)

        }
    }

    function updateQTY(newvalue) {
        return RenderTable.DataProduct.map((data) => {// update Qty value
            return data?.label === newvalue?.label ? data.Soluong : 0
        })
            .filter((data) => data)
    }

    function updateRate(result, newvalue) {
        const rate = document.getElementsByName("Rate" + result)

        RenderTable.DataProduct.map((data) => {
            if (data?.label === newvalue?.label) {
                let valueGiabanle = +data?.GiaBanLe
                return rate[0].value = valueGiabanle?.toLocaleString()
            }
        })
    }

    const updateNameProduction = (result) => {
        let IDProduct = document.getElementsByName("Product" + result)

        let TenLK = RenderTable.DataProduct
            .filter((data) => IDProduct[0].value === data.label ? data.TenLK : "")
            .map((data) => data.TenLK)

        let nameProduct = document.getElementsByName("nameProduct" + result)
        nameProduct[0].value = TenLK[0]
    }

    function updateRender(result, newvalue, Soluong) {
        return RenderTable.Render.map((key, index) => {
            if (result - 1 === index) {
                return {
                    ID: result,
                    NameProduct: newvalue?.label,
                    Qty: 0,
                    MaxQty: Soluong[0]
                }
            }
            else {
                return key
            }
        })
    }
    function addTable() {
        RenderTable.setRender([...RenderTable.Render, {
            ID: RenderTable.Render.length + 1,
            NameProduct: "",
            Qty: 0
        }])
    }

    function DeleteTable(ID) {
        console.log(ID)
        console.log(RenderTable)
        RenderTable.setRender(RenderTable.Render.filter(
            (table) => table?.ID != ID
        ))
    }

    return (
        <>
            <Table striped bordered hover>
                <THeadtable addTable={addTable} />
                <TBodytable DeleteTable={DeleteTable}
                    Onchangeformtable={Onchangeformtable}
                    Render={RenderTable.Render}
                    setRender={RenderTable.setRender}
                    OnchangeQty={OnchangeQty}
                    RenderTable={RenderTable} />
            </Table>
        </>
    )
}

const TBodytable = (props) => {

    const { DeleteTable, Onchangeformtable, Render, OnchangeQty, RenderTable } = props

    return (
        <tbody>
            {
                Render?.map((index) => (
                    <tr key={index.ID.toString()}>
                        <td id={index.ID.toString()}>
                            <Autocomplete
                                disablePortal
                                id={index?.ID.toString()}
                                fullWidth={true}
                                size="small"
                                options={RenderTable.DataProduct}
                                sx={{ width: 200 }}
                                onChange={Onchangeformtable}
                                name={"ID" + index.ID.toString()}
                                renderInput={
                                    (params) => <TextField {...params} onChange={Onchangeformtable} name={"Product" + index.ID} />
                                }
                            />
                        </td>
                        <td>
                            <Form.Control as="textarea" name={"nameProduct" + index.ID.toString()} disabled></Form.Control>
                        </td>
                        <td>
                            <Form.Control
                                onChange={OnchangeQty}
                                className="mb-3"
                                name={"Quantity" + index.ID}
                                id={index?.ID.toString()}
                                type="number"
                                min={0} max={+index.MaxQty} step="1"
                            />
                        </td>
                        <td><Form.Control className="mb-3" name={"Rate" + index.ID.toString()} type="text" disabled /></td>
                        <td><Form.Control className="mb-3" name={"Amount" + index.ID.toString()} type="text" disabled /></td>
                        <td>
                            <Button type='button'
                                onClick={() => DeleteTable(index?.ID.toString())}
                                variant="danger"
                                key={"delete" + index.ID.toString()}><RiDeleteBin7Line /></Button>
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
                <th>ID Product</th>
                <th>Name Product</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>
                    <Button type='button' onClick={addTable} variant="success"><SiAddthis /></Button>
                </th>
            </tr>
        </thead>
    );
};
export default PaidOrderTable