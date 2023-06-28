import { useState, useEffect } from "react";
// import Request from "../../../api/Request";
import Table from "react-bootstrap/Table";
import DropdownSetting from "../../Import/table/DropdownSetting";
import Button from "react-bootstrap/Button";
import classnames from "classnames/bind";
import * as style from "./scss/TableDTBrand.module.scss";
import { TextArea } from "./TextArea";
import { CancelEdit } from "./ActionFunction/CancelEdit";
import { HandleDelete } from "./ActionFunction/HandleDelete";
import { RequestRenderTable } from "./ActionFunction/RequestRenderTable";
import { HandleEdit } from "./ActionFunction/HandleEdit";
import { UpdateEdit } from "./ActionFunction/UpdateEdit";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
const cx = classnames.bind(style);

function TableCustomer(props) {
    const { filters } = props;
    return (
        <Table striped bordered hover>
            <THeadtable />
            <TBodytable filters={filters} />
        </Table>
    );
}
//render table
const THeadtable = () => {
    return (
        <thead>
            <tr>
                <th>ID Customer</th>
                <th>Name Customer</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Date Import</th>
                <th>Action</th>
            </tr>
        </thead>
    );
};
//render table body
const TBodytable = (props) => {
    const { filters } = props;
    const [Data, setData] = useState(null);
    const [formData, setFormData] = useState({});
    const [_idItem, setIdItem] = useState(null);
    //request render table State
    useEffect(() => {
        RequestRenderTable(filters, setData, "CustomerPage");
    }, [filters]);

    // handle text area change events
    const HandleChange = (event) => {
        const { name, value } = event.target;
        const _id = _idItem;
        setFormData({ ...formData, [name]: value, _id });
    };

    //handle data table
    const datatable = Data?.data.result?.map((key) => (
        <>
            <tr>
                <td>
                    <div className={key._id} hidden={false}>
                        {key['IDCustomer']}{" "}
                    </div>
                    <TextArea
                        className={key._id + "hidden"}
                        hidden={true}
                        onChange={HandleChange}
                        name="IDCustomer"
                        value={key['IDCustomer']}
                    />
                </td>
                <td>
                    <div className={key._id} hidden={false}>
                        {key.NameCustomer}
                    </div>
                    <TextArea
                        className={key._id + "hidden"}
                        hidden={true}
                        onChange={HandleChange}
                        name="NameCustomer"
                        value={key.NameCustomer}
                    />
                </td>
                <td>
                    <div className={key._id} hidden={false}>
                        {key.Phone}
                    </div>
                    <TextArea
                        className={key._id + "hidden"}
                        hidden={true}
                        onChange={HandleChange}
                        name="Phone"
                        value={key.Phone}
                    />
                </td>
                <td>
                    <div className={key._id} hidden={false}>
                        {key.Email}
                    </div>
                    <TextArea
                        className={key._id + "hidden"}
                        hidden={true}
                        onChange={HandleChange}
                        name="Email"
                        value={key.Email}
                    />
                </td>
                <td>
                    <div className={cx("dateImport")}>{key.NgayTao}</div>
                </td>
                <td>
                    <DropdownSetting
                        HandleDelete={() =>
                            HandleDelete(
                                key.IDCustomer,
                                "deleteCustomer",
                                RequestRenderTable,
                                filters,
                                setData,
                                "ImportCustomer"
                            )
                        }
                        handleEdit={() => HandleEdit(key._id, setIdItem)}
                    />
                </td>
                <td className={key._id + "hidden"} hidden={true}>
                    <Button
                        variant="secondary"
                        onClick={() => CancelEdit(key._id, setIdItem)}
                    >
                        <AiOutlineCloseCircle/>
                    </Button>{" "}

                    <Button variant="warning" onClick={
                        () => UpdateEdit( 
                            key._id,
                            formData,
                            setIdItem,
                            CancelEdit,
                            RequestRenderTable,
                            filters,
                            setData,
                            "Customer")}><BiEdit/></Button>{" "}
                </td>
            </tr>
        </>
    ));

    return <tbody>{datatable}</tbody>;
};

export { TableCustomer };
