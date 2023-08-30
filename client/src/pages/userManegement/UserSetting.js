import { React, useState, useEffect } from 'react'
import Request from '../../api/Request';
import { Container } from '@mui/material'
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { AlterShowEror, AlterShowSuccess } from '../../components/Alter/AlterShow';
const UserSetting = () => {
  const [formData, setformData] = useState({ _id: sessionStorage.getItem("id") })
  const [pwData, setpwData] = useState({
    pass_nv: "",
    repass_nv: "",
    label: "Re password",
    eror: false
  })
  const [Show, setShow] = useState({
    valueShow: false,
    message: ""
  });
  const [ShowEror, setShowEror] = useState({
    valueShow: false,
    message: ""
  });
  const [valueform, setvalueform] = useState({
    TenNV: "",
    GioiTinh: "Female",
    Email: "",
    SDT: null,
    DiaChi: "",
    pass_nv: "",
    repass_nv: ""
  })

  const handlechange = (event) => {
    const { name, value } = event.target
    setformData({ ...formData, [name]: value })
    setvalueform({ ...valueform, [name]: value })
  }
  const handlechangePass = (event) => {
    const { name, value } = event.target
    console.log(name, value)
    if (name === "repass_nv"){

      setpwData({ ...pwData, repass_nv: value })
      setvalueform({ ...pwData, repass_nv: value })
    }
    else{

      setpwData({ ...pwData, pass_nv: value })
      setpwData({ ...pwData, pass_nv: value })
    }
  }
  useEffect(() => { // set eror re password 
    if (pwData.pass_nv !== pwData.repass_nv) {
      setpwData({ ...pwData, eror: true, label: "Incorrect password" })
    }
    else {
      setpwData({ ...pwData, eror: false, label: "Re password" })
    }
  }, [pwData.pass_nv, pwData.repass_nv])



  const handleDataPass = () => {
    if (pwData.pass_nv !== pwData.repass_nv) {
      setShowEror({
        valueShow: true,
        message: "Password and re-password are not the same"
      })
    }
    else {
      Request
        .patch("/updateUser",
          {
            formData: {
              pass_nv: pwData.pass_nv,
              repass_nv: pwData.repass_nv,
              _id: sessionStorage.getItem("id")
            }
          },
          { headers: { Authorization: sessionStorage.getItem("access_token") } })
        .then(response => {
          if (response?.status === 200) {
            setShow({
              valueShow: true,
              message: "update password successfully"
            })
          }
        })
        .catch((error) => {
          setShowEror({
            valueShow: true,
            message: "error"
          })
        });
    }
  }
  const handleDataInfo = () => {
    Request
      .patch("/updateUser",
        { formData },
        { headers: { Authorization: sessionStorage.getItem("access_token") } })
      .then(response => {
        if (response?.status === 200) {
          setShow({
            valueShow: true,
            message: "update successfully"
          })
        }
      })
      .catch((error) => {
        setShowEror({
          valueShow: true,
          message: "error"
        })
      });
  }
  return (
    <>
      <Container>
        <AlterShowSuccess Show={Show} setShow={setShow} />
        <AlterShowEror ShowEror={ShowEror} setShowEror={setShowEror} />
        <div>
          <h3 className="mb-3">User Profile</h3>
        </div>
        <Typography >Personal Information</Typography>
        <Grid className="mb-3" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 5, sm: 8, md: 12 }}>
          <Grid item xs={6} sm={6} md={6}>
            <TextField error={false} size="small" value={valueform.TenNV} sx={{ minWidth: 500 }} name='TenNV' onChange={handlechange} label="Name"></TextField></Grid>
          <Grid item xs={6} sm={6} md={6}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name='GioiTinh'
                onChange={handlechange}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid className="mb-3" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={6} sm={6} md={6}>
            <TextField size="small" name='Email' sx={{ minWidth: 500 }} onChange={handlechange} label="Email"></TextField></Grid>
          <Grid item xs={6} sm={6} md={6}>
            <TextField size="small" name='SDT' sx={{ minWidth: 500 }} onChange={handlechange} type={'number'} label="Phone"></TextField></Grid>
        </Grid>
        <Grid className="mb-3" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={6} sm={6} md={6}>
            <TextField size="small" multiline
              rows={4} sx={{ minWidth: 500 }} name='DiaChi' onChange={handlechange} label="Address"></TextField></Grid>
        </Grid>
        <Grid className="mb-3" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={6} sm={6} md={6}>
            <Button color="error" size="small" onClick={handleDataInfo} variant="contained">SAVE CHANGE</Button></Grid>
        </Grid>
        <Typography> Change Password</Typography>
        <Grid className="mb-3" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={6} sm={6} md={6}>
            <TextField size="small" name='pass_nv' type="password"
              sx={{ minWidth: 500 }} onChange={handlechangePass}
              label="Password"></TextField></Grid>
          <Grid item xs={6} sm={6} md={6}>
            <TextField size="small" name='repass_nv'
              type="password" sx={{ minWidth: 500 }}
              onChange={handlechangePass}
              error={pwData.eror}
              label={pwData.label}></TextField></Grid>
        </Grid>
        <Grid className="mb-3" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={6} sm={6} md={6}>
            <Button color="error" size="small" onClick={handleDataPass} variant="contained">SAVE CHANGE</Button></Grid>
        </Grid>
      </Container>
    </>
  )
}

export default UserSetting