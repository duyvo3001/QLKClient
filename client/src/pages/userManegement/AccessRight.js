import { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
const AccessRight = (props) => {
    const { setAccessright, Accessright } = props;
    const [open, setOpen] = useState(false);
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

        function getkeys(name, typeOfobj) {
            if(name !== undefined ){
                const returnType = code => {
                    return Object.keys(nameType?.[typeOfobj]).find(key => nameType?.[typeOfobj][key] === code)
                }
                if(returnType(name) !== undefined){
                    setAccessright(draft =>{
                        draft.[typeOfobj].create = checked;
                    })
                }
            }
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
            checkedType.get(code)
        }
        if (name.includes("Product") === true)
            pharseType("Product")
        else if (name.includes("Inventory") === true)
            pharseType("Inventory")
        else if (name.includes("Brand") === true)
            pharseType("Brand")
        else if (name.includes("Supllier") === true)
            pharseType("Supllier")
        else if (name.includes("Customer") === true)
            pharseType("Customer")
        else if (name.includes("Warehouse") === true)
            pharseType("Warehouse")
        else if (name.includes("Export") === true)
            pharseType("Export")
        else if (name.includes("User") === true)
            pharseType("User")

    }
    const nameType = {
        Product: {
            create: "createProduct",
            delete: "deleteProduct",
            update: "updateProduct",
            read: "readProduct",
        },
        Inventory: {
            create: "createInventory",
            delete: "deleteInventory",
            update: "updateInventory",
            read: "readInventory"
        },
        Brand: {
            create: "createBrand",
            delete: "deleteBrand",
            update: "updateBrand",
            read: "readBrand"
        },
        Supllier: {
            create: "createSupllier",
            delete: "deleteSupllier",
            update: "updateSupllier",
            read: "readSupllier"
        },
        Customer: {
            create: "createCustomer",
            delete: "deleteCustomer",
            update: "updateCustomer",
            read: "readCustomer"
        },
        Warehouse: {
            create: "createWarehouse",
            delete: "deleteWarehouse",
            update: "updateWarehouse",
            read: "readWarehouse"
        },
        Export: {
            create: "createExport",
            delete: "deleteExport",
            update: "updateExport",
            read: "readExport"
        },
        User: {
            create: "createUser",
            delete: "deleteUser",
            update: "updateUser",
            read: "readUser"
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
                        <Checkbox name={nameType.update} onChange={HandleClick} color="warning" />
                    }
                    label="update"
                />
                <FormControlLabel
                    control={
                        <Checkbox name={nameType.create} onChange={HandleClick} color="success" />
                    }
                    label="create"
                />
                <FormControlLabel
                    control={
                        <Checkbox name={nameType.delete} onChange={HandleClick} color="error" />
                    }
                    label="delete"
                />
                <FormControlLabel
                    control={
                        <Checkbox name={nameType.read} onChange={HandleClick} color="info" />
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
