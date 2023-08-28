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
  const [formData, setformData] = useState({})
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
  const [valueform, setvalueform] = useState({})

  const handlechange = (event) => {
    const { name, value } = event.target
    setformData({ ...formData, [name]: value })
  }

  useEffect(() => { // set eror re password 
    if (pwData.pass_nv !== pwData.repass_nv) {
      setpwData({ ...pwData, eror: true, label: "Incorrect password" })
    }
    else {
      setpwData({ ...pwData, eror: false, label: "Re password" })
    }
  }, [pwData.pass_nv, pwData.repass_nv])

  const handlechangePass = (event) => {
    const { name, value } = event.target
    console.log(name, value)
    if (name === "repass_nv")
      setpwData({ ...pwData, repass_nv: value })
    else
      setpwData({ ...pwData, pass_nv: value })
  }

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
              repass_nv: pwData.repass_nv
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
            message: error
          })
        });
    }
  }
  const handleDataInfo = () => {

  }
  return (
    <>
      <Container>
        <div>
          <h3 className="mb-3">User Profile</h3>
        </div>
        <Typography >Personal Information</Typography>
        <Grid className="mb-3" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 5, sm: 8, md: 12 }}>
          <Grid item xs={6} sm={6} md={6}>
            <TextField error={false} size="small" sx={{ minWidth: 500 }} name='TenNV' onChange={handlechange} label="Name"></TextField></Grid>
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
        <AlterShowSuccess Show={Show} setShow={setShow} />
        <AlterShowEror ShowEror={ShowEror} setShowEror={setShowEror} />
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