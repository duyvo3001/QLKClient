import { React, useState } from 'react'
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./table.style.scss"

const TableExport = (props) => {
    const { Data, Onchange, onSearch, Value } = props
    const [Render, setRender] = useState([{ ID: 1 }])
    const [valueRate, setValueRate] = useState('')
    const [valueAmount, setValueAmount] = useState('')

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
        setRender([...Render, { ID: Render.length + 1 }])
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
                Render={Render} />
            {/* <TBodytable setRendet={setRender} Render={Render} /> */}
        </Table>
    )
}

const TBodytable = (props) => {
    const { Render, Value, Data, onSearch, Onchange, DeleteTable, OnchangeQty, valueRate, valueAmount } = props

    return (
        <tbody>
            {Render?.map((index) => (
                <tr>
                    <td>
                        <Form.Control name="search" value={Value} id={index.ID} className="mb-3" type="text"
                            onChange={Onchange} />
                        <div className="dropdowntable">
                            {
                                Data?.data?.result
                                    ?.filter((key) => {
                                        const searchTerm = Value?.toLowerCase();
                                        const MaLK = key.MaLK?.toLowerCase();
                                        return searchTerm && MaLK?.startsWith(searchTerm) && MaLK !== searchTerm
                                    })
                                    ?.map((key) => (
                                        <div className="dropdowntable-row" key={key.MaLK} target="-blank"
                                            onClick={() => onSearch(key.MaLK)}
                                        >
                                            <div>
                                                {key.MaLK}
                                            </div>
                                        </div>
                                    ))
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