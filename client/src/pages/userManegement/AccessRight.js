import { useState } from 'react'
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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
        // border: '2px solid #000',
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

                    //update state of setAccessright
                    const objType = { ...Accessright?.[typeOfobj], [returnType(name)]: checked }
                    const objAccessRight = { ...Accessright, [typeOfobj]: objType }
                    setAccessright(objAccessRight)

                    //set checked Checkbox
                    checkedCheckbox(typeOfobj, returnType(name))
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
                // Handle the case when none of the conditions are met
                break;
        }
    }
    const nameType = {
        Product: {
            create: "createProduct", delete: "deleteProduct", update: "updateProduct", read: "readProduct",
        },
        Inventory: {
            create: "createInventory", delete: "deleteInventory", update: "updateInventory", read: "readInventory"
        },
        Brand: {
            create: "createBrand", delete: "deleteBrand", update: "updateBrand", read: "readBrand"
        },
        Supllier: {
            create: "createSupllier", delete: "deleteSupllier", update: "updateSupllier", read: "readSupllier"
        },
        Customer: {
            create: "createCustomer", delete: "deleteCustomer", update: "updateCustomer", read: "readCustomer"
        },
        Warehouse: {
            create: "createWarehouse", delete: "deleteWarehouse", update: "updateWarehouse", read: "readWarehouse"
        },
        Export: {
            create: "createExport", delete: "deleteExport", update: "updateExport", read: "readExport"
        },
        User: {
            create: "createUser", delete: "deleteUser", update: "updateUser", read: "readUser"
        },
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

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>Open access</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" color={"red"} variant="h4" component="h2">
                        Access rights
                    </Typography>
                    <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <GridItem nameType={nameType.Product} ItemName={"Product"} />
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <GridItem nameType={nameType.Inventory} ItemName={"Inventory"} />
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <GridItem nameType={nameType.Brand} ItemName={"Brand"} />
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <GridItem nameType={nameType.Supllier} ItemName={"Supllier"} />
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <GridItem nameType={nameType.Customer} ItemName={"Customer"} />
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <GridItem nameType={nameType.Warehouse} ItemName={"Warehouse"} />
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <GridItem nameType={nameType.Export} ItemName={"Export"} />
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <GridItem nameType={nameType.User} ItemName={"User"} />
                    </Grid>
                </Box>
            </Modal>
        </div>
    )
}

export default AccessRight
