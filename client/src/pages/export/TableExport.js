import { React, useState } from 'react'
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./table.style.scss"

const TableExport = (props) => {
    const { Data, Onchange, onSearch, Value } = props
    const [Render, setRender] = useState( [{ID:1}])

    const AddTable = () => {
        setRender([...Render, {ID: Render.length + 1}])
        console.log(Render)
    }

    return (
        <Table striped bordered hover>
            <THeadtable AddTable={AddTable} />
            <TBodytable Data={Data} Onchange={Onchange} onSearch={onSearch} Value={Value}  Render={Render} />
            {/* <TBodytable setRendet={setRender} Render={Render} /> */}
        </Table>
    )
}

const TBodytable = (props) => {
    const { Render, Value, Data, onSearch, Onchange } = props
    console.log(Render)
    
    return (
        <tbody>
            {Render?.map((index) => (
                <tr key={index.ID}>
                    <td>
                        <Form.Control name="search" value={Value} className="mb-3" type="text" onChange={Onchange} />
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
                                            {key.MaLK}
                                        </div>
                                    ))
                            }
                        </div>
                    </td>
                    <td><Form.Control className="mb-3" type="text" onChange={Onchange} /></td>
                    <td><Form.Control className="mb-3" type="text" onChange={Onchange} disabled /></td>
                    <td><Form.Control className="mb-3" type="text" onChange={Onchange} disabled /></td>
                    <td><Button type='button' variant="danger">Delete</Button></td>
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