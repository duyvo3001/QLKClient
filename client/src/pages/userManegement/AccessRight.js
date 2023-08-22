import { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
const AccessRight = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={6} sm={6} md={6}>h1</Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <FormControlLabel
                                control={
                                    <Checkbox name="gilad" />
                                }
                                label="Gilad Gray"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox name="gilad" />
                                }
                                label="Gilad Gray"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox name="gilad" />
                                }
                                label="Gilad Gray"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox name="gilad" />
                                }
                                label="Gilad Gray"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={6} sm={6} md={6}>h1</Grid>
                        <Grid item xs={6} sm={6} md={6}>h1</Grid>
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={6} sm={6} md={6}>h1</Grid>
                        <Grid item xs={6} sm={6} md={6}>h1</Grid>
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={6} sm={6} md={6}>h1</Grid>
                        <Grid item xs={6} sm={6} md={6}>h1</Grid>
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={6} sm={6} md={6}>h1</Grid>
                        <Grid item xs={6} sm={6} md={6}>h1</Grid>
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={6} sm={6} md={6}>h1</Grid>
                        <Grid item xs={6} sm={6} md={6}>h1</Grid>
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={6} sm={6} md={6}>h1</Grid>
                        <Grid item xs={6} sm={6} md={6}>h1</Grid>
                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={6} sm={6} md={6}>h1</Grid>
                        <Grid item xs={6} sm={6} md={6}>h1</Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    )
}

export default AccessRight
