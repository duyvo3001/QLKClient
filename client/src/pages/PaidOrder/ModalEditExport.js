import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import Request from '../../api/Request';
import EditIcon from '@mui/icons-material/Edit';


const ModalEditExport = (props) => {
    const { id } = props

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
            <Button size='small' variant="contained" color='info' onClick={handleOpen}><EditIcon /></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" color={"black"} variant="h4" component="h2">
                        Edit user
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default ModalEditExport