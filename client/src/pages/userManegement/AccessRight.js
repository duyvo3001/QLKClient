import { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
const AccessRight = (props) => {
    const { setAccessright } = props;
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
    function UpdateAccesss(params) {
        let a = {
            Product: {
                create: false,
                delete: false,
                update: false,
                read: false,
            },
            Inventory: {
                create: false,
                delete: false,
                update: false,
                read: false
            },
            Brand: {
                create: false,
                delete: false,
                update: false,
                read: false
            },
            Supllier: {
                create: false,
                delete: false,
                update: false,
                read: false
            },
            Customer: {
                create: false,
                delete: false,
                update: false,
                read: false
            },
            Warehouse: {
                create: false,
                delete: false,
                update: false,
                read: false
            },
            Export: {
                create: false,
                delete: false,
                update: false,
                read: false
            },
            User: {
                create: false,
                delete: false,
                update: false,
                read: false
            },
        }
    }
    const HandleClick = (event) => {
        const { checked , name } = event.target
        console.log(name.slice(-7));  
        console.log(checked ,name)
        // setAccessright(
        //     prevState => ({
        //         ...prevState,
        //         [event.target.name]: {
        //             update: true
        //         }
        //     })
        // )
    }
    const GridItem = (props) => {
        const { name, ItemName } = props
        return <>
            <Grid item xs={2} sm={2} md={2}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {ItemName}
                </Typography></Grid>
            <Grid item xs={5} sm={5} md={5}>
                <FormControlLabel
                    control={
                        <Checkbox name={name.update} onChange={HandleClick} color="warning" />
                    }
                    label="update"
                />
                <FormControlLabel
                    control={
                        <Checkbox name={name.create} onChange={HandleClick} color="success" />
                    }
                    label="create"
                />
                <FormControlLabel
                    control={
                        <Checkbox name={name.delete} onChange={HandleClick} color="error" />
                    }
                    label="delete"
                />
                <FormControlLabel
                    control={
                        <Checkbox name={name.read} onChange={HandleClick} color="info" />
                    }
                    label="read"
                />
            </Grid>
        </>
    }
    const name = {
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
                        <GridItem name={name.Product} ItemName={"Product"} />
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <GridItem name={name.Inventory} ItemName={"Inventory"} />
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <GridItem name={name.Brand} ItemName={"Brand"} />
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <GridItem name={name.Supllier} ItemName={"Supllier"} />
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <GridItem name={name.Customer} ItemName={"Customer"} />
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <GridItem name={name.Warehouse} ItemName={"Warehouse"} />
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <GridItem name={name.Export} ItemName={"Export"} />
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <GridItem name={name.User} ItemName={"User"} />
                    </Grid>
                </Box>
            </Modal>
        </div>
    )
}

export default AccessRight
