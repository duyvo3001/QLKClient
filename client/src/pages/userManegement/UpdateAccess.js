import { React, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function UpdateAccess(props) {
    const [show, setShow] = useState(false);
    const { HandleChange, Data, IDdata } = props
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updatevalue = Boolean(Data[0]?.update === "true")
    const createvalue = Boolean(Data[0]?.create === "true")
    const deletevalue = Boolean(Data[0]?.valuedelete === "true")
    const readvalue = Boolean(Data[0]?.read === "true")
    return (
        <>
            <Button variant="success" onClick={handleShow} size="sm">
                Access
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Access</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='mb-2 row'>
                        <Col md={6}>
                            <Form.Label>Update access</Form.Label>
                            <Form.Check isValid="true" value={updatevalue}
                                onClick={HandleChange} label="update" name="update" type="checkbox" />
                            <Form.Check isValid="true" value={deletevalue}
                                onClick={HandleChange} label="delete" name="delete" type="checkbox" />
                            <Form.Check isValid="true" label="create" value={createvalue}
                                onClick={HandleChange} name="create" type="checkbox" />
                            <Form.Check isValid="true" label="read" value={readvalue}
                                onClick={HandleChange} name="read" type="checkbox" />
                        </Col>
                        <Col md={6}>
                            <Form.Label>Current value</Form.Label>
                            <Form.Check isInvalid="true" checked={updatevalue} value={updatevalue}
                                label="update" name="update" type="checkbox" />
                            <Form.Check isInvalid="true" checked={deletevalue} value={deletevalue}
                                label="delete" name="delete" type="checkbox" />
                            <Form.Check isInvalid="true" checked={createvalue} label="create" value={createvalue}
                                name="create" type="checkbox" />
                            <Form.Check isInvalid="true" checked={createvalue} label="read" value={readvalue}
                                name="read" type="checkbox" />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default UpdateAccess

