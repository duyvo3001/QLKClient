import { React, useState } from 'react'
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./table.style.scss"

const TableExport = (props) => {
    const { Data, Onchange, onSearch, Value, CheckID } = props

    const [Render, setRender] = useState([// Render table
        {
            ID: 1,
            NameProduct: "",
            Qty: 0
        }
    ])
    
    const [valueRate, setValueRate] = useState('') // ser value Rate
    const [valueAmount, setValueAmount] = useState('')// ser value Amount

    const OnchangeQty = (event) => {
        Data?.data?.result?.filter((key) => {
            return key.MaLK === Value
        })
            ?.map((key) => [
                setValueRate(key.GiaBanLe),
                setValueAmount(event.target.value * key.GiaBanLe)
            ]
            )
    }

    const AddTable = () => {
        setRender([...Render, {
            ID: Render.length + 1,
            NameProduct: "",
            Qty: 0
        }])
    }

    const DeleteTable = (ID) => {
        setRender(Render.filter(table => table.ID !== ID))
    }

    return (
        <Table striped bordered hover>
            <THeadtable AddTable={AddTable} />
            <TBodytable
                Data={Data}
                OnchangeQty={OnchangeQty}
                Onchange={Onchange}
                onSearch={onSearch}
                Value={Value}
                DeleteTable={DeleteTable}
                valueRate={valueRate}
                valueAmount={valueAmount}
                CheckID={CheckID}
                Render={Render} />
        </Table>
    )

}


function RenderSuggestion(Value, Data, onSearch, ID, CheckID) {
    // render when  ID = id form state change
    // eslint-disable-next-line eqeqeq
    if (CheckID == ID)
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



const TBodytable = (props) => {
    const { Render, Value, Data, onSearch, Onchange, DeleteTable, OnchangeQty, valueRate, valueAmount, CheckID } = props

    return (
        <tbody>
            {
                Render?.map((index) => (
                    <tr>
                        <td>    
                            <Form.Control name={"search" + index.ID}
                                id={index.ID} className="mb-3"
                                onChange={Onchange} value={index.NameProduct} />
                            <div className="dropdowntable">
                                {
                                    RenderSuggestion(Value, Data, onSearch, index.ID, CheckID)
                                }
                            </div>
                        </td>
                        <td><Form.Control onChange={OnchangeQty} className="mb-3" type="text" /></td>
                        <td><Form.Control value={valueRate} className="mb-3" type="text" disabled /></td>
                        <td><Form.Control value={valueAmount} className="mb-3" type="text" disabled /></td>
                        <td><Button type='button' onClick={() => DeleteTable(index.ID)} variant="danger">Delete</Button></td>
                    </tr>
                ))
            }
        </tbody>
    )
};
const THeadtable = (props) => {
    const { AddTable } = props
    return (
        <thead>
            <tr>
                <th>Name Product</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>
                    <Button type='button' onClick={AddTable} variant="danger">Add</Button>
                </th>
            </tr>
        </thead>
    );
};
export default TableExport