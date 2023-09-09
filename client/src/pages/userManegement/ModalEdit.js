import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AccessRight from "./AccessRight";
import UpdatePassword from './UpdatePassword';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import Request from '../../api/Request';
import EditIcon from '@mui/icons-material/Edit';
const ModalEdit = (props) => {
    const { id, idObj } = props
    const [checkonchangeAccess, setcheckonchangeAccess] = useState()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [formData, setFormData] = useState({ _id: idObj });
    const [valueform, setvalueform] = useState({
        TenNV: "",
        GioiTinh: "Female",
        Email: "",
        SDT: 0,
        DiaChi: "",
        pass_nv: "",
        repass_nv: ""
    })
    const [pwData, setpwData] = useState({
        pass_nv: "",
        repass_nv: "",
        label: "Re password",
        eror: false
    })
    const [disableButton, setdisableButton] = useState({
        info: true,
        pass: true
    })
    const [DataUser, setDataUser] = useState({
        MaNV: "",
        TenNV: "",
        Sex: "Male",
        DiaChi: "",
        USER_NV: "",
        SDT: 0,
        Email: ""
    })
    const [open, setOpen] = useState(false);
    const [Sex, setSex] = useState("Male");
    const objCrud = {
        create: false, delete: false, update: false, read: false
    }
    const [Accessright, setAccessright] = useState({
        Product: objCrud,
        Inventory: objCrud,
        Brand: objCrud,
        Supllier: objCrud,
        Customer: objCrud,
        Warehouse: objCrud,
        Export: objCrud,
        User: objCrud,
    })
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
    const HandleChange = (event) => {
        const { name, value } = event.target;
        const Sex = event.target.id
        updateformData(name, value)
        updateSex(Sex)
    };
    function updateSex(Sex) {
        setSex(Sex === "Male" ? "Male" : "Female");
    }
    function updateformData(name, value) {
        if (name !== "Sex") {
            setFormData({ ...formData, [name]: value });
        }
    }
    const HandleData = (event) => {
        event.preventDefault();
        Request
            .patch(
                "/updateUser",
                {
                    formData,
                    Accessright: checkonchangeAccess === Accessright ? undefined : Accessright,
                    Sex
                },
                { headers: { Authorization: sessionStorage.getItem("access_token") } }
            ).then((response) => {
                console.log(response)
                setOpen(false)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const RowColComponent = ({ text1, ID1, typeinput1, placeholder1, text2, ID2, typeinput2, placeholder2 }) => {
        return <>
            <Row className='mb-2 row'>
                <Col md={2}><Form.Label column="sm">{text1}</Form.Label></Col>
                <Col md={4}><Form.Control placeholder={placeholder1} onChange={HandleChange} size="sm" type={typeinput1} name={ID1} /></Col>
                <Col md={2}><Form.Label column="sm">{text2}</Form.Label></Col>
                <Col md={4}><Form.Control placeholder={placeholder2} onChange={HandleChange} size="sm" type={typeinput2} name={ID2} /></Col>
            </Row>
        </>
    }
    function handlechangePass(event) {
        const { name, value } = event.target
        if (name === "repass_nv") {
            setpwData({ ...pwData, repass_nv: value })
            setvalueform({ ...valueform, repass_nv: value })
        }
        else {
            setpwData({ ...pwData, pass_nv: value })
            setvalueform({ ...valueform, pass_nv: value })
        }
    }
    function setPasswordFormData() {
        setFormData({ ...formData, pass_nv: pwData.pass_nv, repass_nv: pwData.repass_nv })
    }
    useEffect(() => { // set eror re password 
        if (pwData.pass_nv !== pwData.repass_nv) {
            setpwData({ ...pwData, eror: true, label: "Incorrect password" })
        }
        else {
            setpwData({ ...pwData, eror: false, label: "Re password" })
        }
    }, [pwData.pass_nv, pwData.repass_nv])

    useEffect(() => {//set disable button info
        function checkValueform() {
            if (valueform.TenNV === ""
                && valueform.GioiTinh === "Female"
                && valueform.SDT == 0
                && valueform.Email === ""
                && valueform.DiaChi === "")
                return true
            else return false
        }
        setdisableButton({ ...disableButton, info: checkValueform() === true ? true : false })
    }, [formData])

    useEffect(() => {//set disable button pass
        setdisableButton({ ...disableButton, pass: pwData.pass_nv === "" || pwData.repass_nv === "" ? true : false })
    }, [pwData])

    useEffect(() => {// get data user
        if (open === true) {
            Request
                .get(`/getInfoUser/${id}`, {
                    headers: { 'Authorization': sessionStorage.getItem("access_token") }
                })
                .then(response => {
                    setDataUser(response.data.result[0])
                    setAccessright(response.data.result[0].Accessright)
                    setcheckonchangeAccess(response.data.result[0].Accessright)
                })
                .catch((error) => console.error(error))
        }
    }, [open])

    return (
        <>
            <div>
                <Button size='small' variant="contained" color='info' onClick={handleOpen}><EditIcon/></Button>
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
                        <CloseButton onClick={handleClose} />
                        <Container>
                            <Form onSubmit={HandleData}>
                                {RowColComponent(
                                    {
                                        text1: "ID Staff", ID1: "MaNV", typeinput: "text", placeholder1: DataUser.MaNV,
                                        text2: "Name Staff", ID2: "TenNV", typeinpu2: "text", placeholder2: DataUser.TenNV
                                    }
                                )}
                                <Row className='mb-2 row'>
                                    <Col md={2}><Form.Label column="sm">Sex</Form.Label></Col>
                                    <Col md={2}><Form.Check id="Male" label="Male" onChange={HandleChange} size="sm" type="radio" name="Sex" /></Col>
                                    <Col md={2}><Form.Check id="Female" label="Female" onChange={HandleChange} size="sm" type="radio" name="Sex" /></Col>
                                    <Col md={2}><Form.Label column="sm">Address</Form.Label></Col>
                                    <Col md={4}><Form.Control placeholder={DataUser.DiaChi} as="textarea" onChange={HandleChange} size="sm" type="text" name="DiaChi" /></Col>
                                </Row>
                                <Row className='mb-2 row'>
                                    <Col md={2}><Form.Label column="sm">Date of birth</Form.Label></Col>
                                    <Col md={4}><Form.Control onChange={HandleChange} size="sm" type="date" name="NgaySinh" /></Col>
                                    <Col md={2}><Form.Label column="sm">User Staff</Form.Label></Col>
                                    <Col md={4}><Form.Control placeholder={DataUser.USER_NV} onChange={HandleChange} size="sm" type="text" name="USER_NV" /></Col>
                                </Row>
                                {RowColComponent(
                                    {
                                        text1: "Phone", ID1: "SDT", typeinput: "number", placeholder1: DataUser.SDT,
                                        text2: "Email", ID2: "Email", typeinpu2: "email", placeholder2: DataUser.Email,
                                    })}
                                <Row className='mb-2 row'>
                                    <Col md={2}>Access right</Col>
                                    <Col md={4}><AccessRight Accessright={Accessright} setAccessright={setAccessright} /></Col>
                                    <Col md={2}>Password</Col>
                                    <Col md={4}>
                                        <UpdatePassword setPasswordFormData={setPasswordFormData} handlechangePass={handlechangePass} valueform={valueform}
                                            disableButton={disableButton} pwData={pwData} />
                                        {" "}</Col>
                                </Row>
                            </Form>
                            <Button onClick={HandleData} variant="contained">Update data</Button>
                        </Container>
                    </Box>
                </Modal>
            </div>
        </>
    )
}

export default ModalEdit