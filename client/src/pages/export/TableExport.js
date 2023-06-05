import { React, useState } from 'react'
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./table.style.scss"

const TableExport = (props) => {
    const { Data, Onchange, onSearch, Value, CheckID } = props
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
    const [tableData, setTableData] = useState([]);

    const addRow = () => {
        setTableData([...tableData, []]);
    };

    const updateCell = (rowIndex, cellIndex, value) => {
        const newData = [...tableData];
        newData[rowIndex][cellIndex] = value;
        setTableData(newData);
    };
    // return (
    //     <Table striped bordered hover>
    //         <THeadtable AddTable={AddTable} />
    //         <TBodytable
    //             Data={Data}
    //             OnchangeQty={OnchangeQty}
    //             Onchange={Onchange}
    //             onSearch={onSearch}
    //             Value={Value}
    //             DeleteTable={DeleteTable}
    //             valueRate={valueRate}
    //             valueAmount={valueAmount}
    //             CheckID={CheckID}
    //             Render={Render} />
    //     </Table>
    // )
    return (
        <div>
            <button onClick={addRow}>Add Row</button>
            <table>
                <tbody>
                    {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>
                                    <h1>hihi</h1>
                                    {/* <input
                        value={cell}
                        onChange={(e) => updateCell(rowIndex, cellIndex, e.target.value)}
                      /> */}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
function CheckID(params) {
    return
}
function RenderSuggestion(Value, Data, onSearch, ID, CheckID) {
    // render khi  ID = id form dang nhap  
    // eslint-disable-next-line eqeqeq
    if (CheckID == ID)
        return (
            Data?.data?.result
                ?.filter((key) => {
                    console.log(Value)
                    const searchTerm = Value?.toLowerCase();
                    const MaLK = key.MaLK?.toLowerCase();
                    return searchTerm && MaLK?.startsWith(searchTerm) && MaLK !== searchTerm
                })
                ?.map((key) => (
                    <div className="dropdowntable-row" key={key.MaLK} target="-blank"
                        onClick={
                            () => {
                                const test = document.getElementById(ID)
                                return test.value = key.MaLK
                            }
                        }
                    >
                        <div>
                            {key.MaLK}
                        </div>
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
                                onChange={Onchange} value={Value} />
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