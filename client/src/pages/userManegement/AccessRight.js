import { useEffect, useState } from 'react'
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseButton from 'react-bootstrap/esm/CloseButton';

const AccessRight = (props) => {
    const { setAccessright, Accessright } = props;
    const [open, setOpen] = useState(false);
    const objCrud = {
        create: false, delete: false, update: false, read: false
    }
    const [acceptCKbox, setacceptCKbox] = useState({
        Product: objCrud,
        Inventory: objCrud,
        Brand: objCrud,
        Supllier: objCrud,
        Customer: objCrud,
        Warehouse: objCrud,
        Export: objCrud,
        User: objCrud
    })

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    const HandleClick = (event) => {
        const { checked, name } = event.target

        const getkeys = (name, typeOfobj) => {
            if (name !== undefined) {
                event.preventDefault();
                // get type of nameType "create" or "update" or "delete" or "read"
                const returnType = code => {
                    return Object.keys(nameType?.[typeOfobj]).find(key => nameType?.[typeOfobj][key] === code)
                }
                if (returnType(name) !== undefined) {
                    const objType = { ...Accessright?.[typeOfobj], [returnType(name)]: checked } //update state of setAccessright
                    const objAccessRight = { ...Accessright, [typeOfobj]: objType }

                    setAccessright(objAccessRight)
                    checkedCheckbox(typeOfobj, returnType(name))//set checked Checkbox
                }
            }
        }

        const checkedCheckbox = (typeOfobj, TypeCheck) => {
            const objacceptCKbox = { ...acceptCKbox?.[typeOfobj], [TypeCheck]: checked }
            const objacceptCKboxset = { ...acceptCKbox, [typeOfobj]: objacceptCKbox }

            setacceptCKbox(objacceptCKboxset)
        }

        const checkedType = new Map([
            ["Product", getkeys(name, "Product")],
            ["Inventory", getkeys(name, "Inventory")],
            ["Brand", getkeys(name, "Brand")],
            ["Supllier", getkeys(name, "Supllier")],
            ["Customer", getkeys(name, "Customer")],
            ["Warehouse", getkeys(name, "Warehouse")],
            ["Export", getkeys(name, "Export")],
            ["User", getkeys(name, "User")]
        ])
        const pharseType = code => {
            return checkedType.get(code)
        }

        switch (true) {
            case name.includes("Product"):
                pharseType("Product");
                break;
            case name.includes("Inventory"):
                pharseType("Inventory");
                break;
            case name.includes("Brand"):
                pharseType("Brand");
                break;
            case name.includes("Supplier"):
                pharseType("Supplier");
                break;
            case name.includes("Customer"):
                pharseType("Customer");
                break;
            case name.includes("Warehouse"):
                pharseType("Warehouse");
                break;
            case name.includes("Export"):
                pharseType("Export");
                break;
            case name.includes("User"):
                pharseType("User");
                break;
            default:
                break;
        }
    }

    function crud(params1, params2, params3, params4) {
        return {
            create: params1,
            delete: params2,
            update: params3,
            read: params4,
        }
    }
    useEffect(() => {
        setacceptCKbox(Accessright)
    }, [Accessright])

    const nameType = {
        Product: crud("createProduct", "deleteProduct", "updateProduct", "readProduct"),
        Inventory: crud("createInventory", "deleteInventory", "updateInventory", "readInventory"),
        Brand: crud("createBrand", "deleteBrand", "updateBrand", "readBrand"),
        Supllier: crud("createSupllier", "deleteSupllier", "updateSupllier", "readSupllier"),
        Customer: crud("createCustomer", "deleteCustomer", "updateCustomer", "readCustomer"),
        Warehouse: crud("createWarehouse", "deleteWarehouse", "updateWarehouse", "readWarehouse"),
        Export: crud("createExport", "deleteExport", "updateExport", "readExport"),
        User: crud("createUser", "deleteUser", "updateUser", "readUser"),
    }

    const GridItem = (props) => {
        const { nameType, ItemName } = props
        return <>
            <Grid item xs={2} sm={2} md={2}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {ItemName}
                </Typography></Grid>
            <Grid item xs={5} sm={5} md={5}>
                <FormControlLabel
                    control={
                        <Checkbox name={nameType.update} checked={acceptCKbox?.[ItemName].update} onChange={HandleClick} color="warning" />
                    }
                    label="update"
                />
                <FormControlLabel
                    control={
                        <Checkbox name={nameType.create} checked={acceptCKbox?.[ItemName].create} onChange={HandleClick} color="success" />
                    }
                    label="create"
                />
                <FormControlLabel
                    control={
                        <Checkbox name={nameType.delete} checked={acceptCKbox?.[ItemName].delete} onChange={HandleClick} color="error" />
                    }
                    label="delete"
                />
                <FormControlLabel
                    control={
                        <Checkbox name={nameType.read} checked={acceptCKbox?.[ItemName].read} onChange={HandleClick} color="info" />
                    }
                    label="read"
                />
            </Grid>
        </>
    }
    const ComponentGrid = (props) => {
        const { name, item } = props;
        return (<>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <GridItem nameType={name} ItemName={item} />
            </Grid>
        </>)
    }
    return (
        <div>
            <Button variant="contained" color='info' onClick={handleOpen}>Access</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CloseButton onClick={() => setOpen(false)} />
                    <Typography id="modal-modal-title" color={"dimgray"} variant="h4" component="h2">
                        Access rights
                    </Typography>
                    <ComponentGrid name={nameType.Product} item={"Product"} />
                    <ComponentGrid name={nameType.Inventory} item={"Inventory"} />
                    <ComponentGrid name={nameType.Brand} item={"Brand"} />
                    <ComponentGrid name={nameType.Supllier} item={"Supllier"} />
                    <ComponentGrid name={nameType.Customer} item={"Customer"} />
                    <ComponentGrid name={nameType.Warehouse} item={"Warehouse"} />
                    <ComponentGrid name={nameType.Export} item={"Export"} />
                    <ComponentGrid name={nameType.User} item={"User"} />
                </Box>
            </Modal>
        </div>
    )
}

export default AccessRight
