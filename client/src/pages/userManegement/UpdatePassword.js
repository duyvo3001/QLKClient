import { React, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
function UpdatePassword(props) {
    const [show, setShow] = useState(false);
    const { HandleChange ,showAlter } = props
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="info" onClick={handleShow} size="sm">
                password
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose} disabled={showAlter}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default UpdatePassword 