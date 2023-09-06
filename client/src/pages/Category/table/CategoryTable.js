import { useState, useEffect } from "react";
import DropdownSetting from "../../Import/table/DropdownSetting";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { TextArea } from "../../Import/table/TextArea";
import { RequestRenderTable } from "../../Import/table/ActionFunction/RequestRenderTable";
import { HandleDelete } from "../../Import/table/ActionFunction/HandleDelete";
import { HandleEdit } from "../../Import/table/ActionFunction/HandleEdit";
import { UpdateEdit } from "../../Import/table/ActionFunction/UpdateEdit";
import { CancelEdit } from "../../Import/table/ActionFunction/CancelEdit";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

const CategoryTable = (props) => {
  const { filters, valuehidden, searchBox } = props;
  return (
      <Table hover>
          <THeadtable valuehidden={valuehidden} />
          <TBodytable filters={filters} searchBox={searchBox} valuehidden={valuehidden} />
      </Table>
  );
}
const THeadtable = (props) => {
  const { valuehidden } = props;
    return (
        <thead>
            <tr>
                <th>ID Category</th>  
                <th>Date Import</th>
                <th hidden={valuehidden}>Action</th>
            </tr>
        </thead>
    );
}
const TBodytable = (props) => {
  const { filters, valuehidden, searchBox } = props;
    const [Data, setData] = useState(null);
    const [formData, setFormData] = useState({});
    const [_idItem, setIdItem] = useState(null);

    //request render table State
    useEffect(() => {// check if checkbox is !== 0 and !== undefined 
        if (searchBox?.length !== 0 && searchBox?.length !== undefined)
            setData(searchBox)
        else
            RequestRenderTable(filters, setData, "CategoryPage");
    }, [filters, searchBox]);

    // handle text area change events
    const HandleChange = (event) => {
        const { name, value } = event.target;
        const _id = _idItem;
        setFormData({ ...formData, [name]: value, _id });
    };

    //handle data table
    const datatable = Data?.data?.result !== undefined ? Data?.data?.result?.map((key) => (
        <>
            <tr>
                <td>
                    <div className={key._id} hidden={false}>
                        {key['Category']}{" "}
                    </div>
                    <TextArea
                        className={key._id + "hidden"}
                        hidden={true}
                        onChange={HandleChange}
                        name="Category"
                        value={key['Category']}
                    />
                </td>
                <td>
                    <div>{key.Date}</div>
                </td>
                <td hidden={valuehidden}>
                    <DropdownSetting
                        HandleDelete={() =>
                            HandleDelete(
                                key.Category,
                                "deleteCategory",
                                RequestRenderTable,
                                filters,
                                setData,
                                "CategoryPage"
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
                        <AiOutlineCloseCircle />
                    </Button>{" "}

                    <Button variant="warning" onClick={
                        () => UpdateEdit(
                            key?._id,
                            formData,
                            setIdItem,
                            CancelEdit,
                            RequestRenderTable,
                            filters,
                            setData,
                            "Category"
                        )}>
                        <BiEdit /></Button>{" "}
                </td>
            </tr>
        </>
    )) : Data?.map((key) => (
        <>
            <tr>
                <td>
                    <div className={key._id} hidden={false}>
                        {key['IDCategory']}{" "}
                    </div>
                    <TextArea
                        className={key._id + "hidden"}
                        hidden={true}
                        onChange={HandleChange}
                        name="IDCategory"
                        value={key['IDCategory']}
                    />
                </td>
                <td>
                    <div>{key.NgayNhap}</div>
                </td>
                <td hidden={valuehidden}>
                    <DropdownSetting
                        HandleDelete={() =>
                            HandleDelete(
                                key._id,
                                "deleteCategory",
                                RequestRenderTable,
                                filters,
                                setData,
                                "/CategoryPage/1"
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
                        <AiOutlineCloseCircle />
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
                            "updateCategory"
                        )}>
                        <BiEdit /></Button>{" "}
                </td>
            </tr>
        </>))

    return <tbody>{datatable}</tbody>;
}
export {CategoryTable}