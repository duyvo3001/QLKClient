import { React, useState } from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { MdPassword } from 'react-icons/md';

function UpdatePassword(props) {
    const { showAlter, HandleChange } = props;
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
                    <Typography id="modal-modal-title" color={"black"} variant="h4" component="h2">
                        Update Password
                    </Typography>
                    <Alert key="danger" variant="danger" show={showAlter}>
                        Your password or Re Password don't correct
                    </Alert>
                    <Form.Floating className="mb-3" >
                        <Form.Control placeholder="Password" type="password" name="pass_nv" onChange={HandleChange}>
                        </Form.Control>
                        <label htmlFor="floatingInputCustom">Password</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                        <Form.Control placeholder="Password" type="password" name="repass_nv" onChange={HandleChange}>
                        </Form.Control>
                        <label htmlFor="floatingInputCustom">Re Password</label>
                    </Form.Floating>
                    <Button variant="primary" onClick={handleClose} disabled={showAlter}>
                        Save Changes
                    </Button>
                </Box>
            </Modal>
        </>
    );
}
export default UpdatePassword 