import { React, useState } from 'react'
import { Container } from '@mui/material'
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
const UserSetting = () => {
  const [formData, setformData] = useState({})
  const [valueform, setvalueform] = useState({})
  return (
    <>
      <Container>
        <div>
          <h3 className="mb-3">User Profile</h3>
        </div>
        <Typography >Personal Information</Typography>
        <Grid className="mb-3" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 5, sm: 8, md: 12 }}>
          <Grid item xs={6} sm={6} md={6}>
            <TextField size="small" sx={{ minWidth: 500 }} name='TenNV' label="Name"></TextField></Grid>
          <Grid item xs={6} sm={6} md={6}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name='GioiTinh'
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid className="mb-3" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={6} sm={6} md={6}>
            <TextField size="small" sx={{ minWidth: 500 }} label="Email"></TextField></Grid>
          <Grid item xs={6} sm={6} md={6}>
            <TextField size="small" sx={{ minWidth: 500 }} label="Phone"></TextField></Grid>
        </Grid>
        <Grid className="mb-3" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={6} sm={6} md={6}>
            <TextField size="small" multiline
              rows={4} sx={{ minWidth: 500 }} label="Address"></TextField></Grid>
        </Grid>
        <Grid className="mb-3" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={6} sm={6} md={6}>
            <Button color="error" size="small" variant="contained">SAVE CHANGE</Button></Grid>
        </Grid>
        <Typography> Change Password</Typography>
        <Grid className="mb-3" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={6} sm={6} md={6}>
            <TextField size="small" type="password" sx={{ minWidth: 500 }} label="Password"></TextField></Grid>
          <Grid item xs={6} sm={6} md={6}>
            <TextField size="small" type="password" sx={{ minWidth: 500 }} label="Re Password"></TextField></Grid>
        </Grid>
        <Grid className="mb-3" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={6} sm={6} md={6}>
            <Button color="error" size="small" variant="contained">SAVE CHANGE</Button></Grid>
        </Grid>
      </Container>
    </>
  )
}

export default UserSetting