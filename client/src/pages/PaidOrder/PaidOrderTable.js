import { React, useContext, useState } from 'react'
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import { RiDeleteBin7Line } from "react-icons/ri";
import { SiAddthis } from "react-icons/si";
import Form from 'react-bootstrap/Form';
import { DataOnchange } from './PaidOrderPage';
const PaidOrderTable = () => {
    const RenderTable = useContext(DataOnchange)
    const [CheckID, setCheckID] = useState(1)

    const updateAmount = (ID, Qty, Product) => { // Update amount
        const setNameProduct = document.getElementsByName("Amount" + ID)
        let Rate = 0;
        RenderTable.DataProduct.result?.map((key) => {
            if (Product == key.MaLK) {
                Rate = key.GiaBanLe
            }
        })
        const numberAmount = Rate * Qty
        setNameProduct[0].value = numberAmount?.toLocaleString()
    }

    const OnchangeQty = (event) => { // Update Qty 
        const { name, value } = event.target;
        let Product = "";
        const valueSearch = document.getElementsByName("search" + event.target.id)

        RenderTable.DataProduct.result?.map((key) => {
            if (valueSearch[0].value == key.MaLK) {
                console.info(key.Soluong)
            }
        })

        const updateRender = RenderTable.Render.map((key, index) => {// setvalue for Render
            if (event.target.id - 1 === index) {
                Product = key.NameProduct;
                return {
                    ID: +event.target.id,
                    NameProduct: key.NameProduct,
                    Qty: value , 
                    MaxQty : key.MaxQty
                }
            }
            else {
                return key
            }
        })
        RenderTable.setRender(updateRender);
        updateAmount(event.target.id, value, Product);
    }

    const Onchangeformtable = (event) => { //get value onchange , chuyen qua table 

        const { name, value } = event.target;

        const updateRender = RenderTable.Render.map((key, index) => {
            if (event.target.id - 1 === index) {
                return {
                    ID: +event.target.id,
                    NameProduct: value,
                    Qty: 0
                }
            }
            else {
                return key
            }
        })

        setCheckID(event.target.id)

        RenderTable.setRender(updateRender);

    }

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
        <>
            <Table striped bordered hover>
                <THeadtable addTable={addTable} />
                <TBodytable DeleteTable={DeleteTable}
                    Onchangeformtable={Onchangeformtable}
                    CheckID={CheckID}
                    Render={RenderTable.Render}
                    setRender={RenderTable.setRender}
                    OnchangeQty={OnchangeQty}
                    RenderTable={RenderTable} />
            </Table>
        </>
    )
}

const TBodytable = (props) => {

    const { DeleteTable, Onchangeformtable, CheckID, Render, setRender, OnchangeQty, RenderTable } = props


    function updateRender(value, nameProduct, Product) { // update Render on change
        return (
            Render.map((key, index) => {
                if (CheckID - 1 == index) {
                    const setNameProduct = document.getElementsByName(nameProduct)
                    setNameProduct[0].value = Product

                    const Soluong = RenderTable.DataProduct.result?.filter((data) => {
                        return data.MaLK === value ? data.Soluong : null
                    })
                    .map((key) =>{
                        return key.Soluong
                    })
                    
                    return {
                        ID: +CheckID,
                        NameProduct: value,
                        Qty: 0,
                        MaxQty: Soluong
                    }
                }
                else return key
            }))
    }

    function updateRate(value, Rate) {// update Rate on change
        RenderTable?.DataProduct?.result
            ?.map((key) => {
                if (key.MaLK === value) {
                    const setRate = document.getElementsByName(Rate)
                    const numberRate = +key.GiaBanLe
                    return setRate[0].value = numberRate?.toLocaleString()    // return key == value
                }
            })
    }

    const onSearch = (Product, CheckID) => { //set value onsearch
        const nameProduct = 'search' + CheckID;
        const Rate = 'Rate' + CheckID;
        const value = Product

        setRender(updateRender(value, nameProduct, Product))

        updateRate(value, Rate)
    }

    const RenderSuggestion = (props) => {
        const { DataProduct, onSearch, ID, CheckID, Product } = props

        if (CheckID == ID)// render when  ID = id form state change
        {
            return (
                DataProduct?.result
                    ?.filter((key) => {

                        const searchTerm = Product[+CheckID - 1]?.NameProduct?.toLowerCase();

                        const MaLK = key.MaLK?.toLowerCase();

                        const startsWithSearch = searchTerm != null ? MaLK?.startsWith(searchTerm) : null

                        return searchTerm && startsWithSearch && MaLK !== searchTerm
                    })
                    ?.map((key) => (
                        <div className="dropdowntable-row" key={key.MaLK} target="-blank"
                            onClick={
                                () => {
                                    onSearch(key.MaLK, CheckID)
                                }
                            }
                        >
                            <div key={"item" + key.MaLK}>{key.MaLK}</div>
                        </div>
                    ))
            )
        }
    }

    return (
        <tbody>
            {
                Render?.map((index) => (
                    <tr key={index.ID}>
                        <td>
                            <Form.Control
                                name={"search" + index?.ID}
                                type="text"
                                id={index?.ID}
                                className="mb-3"
                                onChange={Onchangeformtable} />

                            <div className="dropdowntable">
                                {
                                    <RenderSuggestion
                                        DataProduct={RenderTable.DataProduct}
                                        onSearch={onSearch}
                                        ID={index?.ID}
                                        CheckID={CheckID}
                                        Product={Render}
                                    />
                                }
                            </div>
                        </td>
                        <td>
                            <Form.Control
                                onChange={OnchangeQty}
                                className="mb-3"
                                name={"Quantity" + index.ID}
                                id={index?.ID}
                                type="number"
                                min={0} max={+index.MaxQty} step="1"
                            />
                        </td>
                        <td><Form.Control className="mb-3" name={"Rate" + index.ID} type="text" disabled /></td>
                        <td><Form.Control className="mb-3" name={"Amount" + index.ID} type="text" disabled /></td>
                        <td>
                            <Button type='button'
                                onClick={() => DeleteTable(index?.ID)}
                                variant="danger"
                                key={"delete" + index.ID}><RiDeleteBin7Line/></Button>
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
                    <Button type='button' onClick={addTable} variant="success"><SiAddthis/></Button>
                </th>
            </tr>
        </thead>
    );
};
export default PaidOrderTable