import { React, useState } from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import CloseButton from "react-bootstrap/esm/CloseButton";

function UpdatePassword(props) {
    const { handlechangePass, valueform, pwData, disableButton ,setPasswordFormData } = props;
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        height: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    return (
        <>
            <Button variant="contained" onClick={handleOpen}>Update Password</Button>

            <Modal open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <CloseButton onClick={handleClose}/>
                    <div className='contentform'>
                        <Typography className='textTypo'> Change Password</Typography>
                        <div className='textGrid'>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField size="small" name='pass_nv' type="password"
                                        sx={{ minWidth: 500 }} onChange={handlechangePass}
                                        value={valueform.pass_nv}
                                        label="Password"></TextField></Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField size="small" name='repass_nv'
                                        type="password" sx={{ minWidth: 500 }}
                                        value={valueform.repass_nv}
                                        onChange={handlechangePass}
                                        error={pwData.eror}
                                        label={pwData.label}></TextField></Grid>
                            </Grid>
                        </div>
                        <Grid className="mb-3" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid item xs={6} sm={6} md={6}>
                                <Button color="success" onClick={setPasswordFormData} size="small"  disabled={disableButton.pass} variant="contained">SAVE CHANGE</Button></Grid>
                        </Grid>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
export default UpdatePassword 