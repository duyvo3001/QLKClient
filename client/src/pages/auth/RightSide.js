import { useState, useContext, useEffect } from "react";
import imgSignin from "../auth/images/signin-image.jpg"
import React from 'react'
import { Button } from "@mui/material";
import Request from '../../api/Request.js'
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AuthContext } from "../../context/AuthContext.js";
import { Navigate } from 'react-router-dom';
import '../auth/styleLogin.scss'
const RightSide = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const [propresslogin, setProgress] = useState(true)

  const [formData, setFormData] = useState({
    pass_nv: "",
    user_nv: ""
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const [show, setShow] = useState({
    valueShow: false,
    message: ""
  });

  const [Disabledbtn, setDisabledbtn] = useState(true)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // event.preventDefault();
    setProgress(false)
    Request
      .post('/signin',
        { formData },
        { headers: { 'Authorization': sessionStorage.getItem("access_token") } },
      )
      .then(response => {
        if (response.status === 200) {
          sessionStorage.setItem('access_token', response.data.access_token);
          sessionStorage.setItem('id', response.data._id);
          setLoggedIn(true);
          setIsAuthenticated(true);
        }
        else {
          setShow({
            valueShow: true,
            message: response?.data?.message
          })
          setDisabledbtn(true)
        }
      })
      .catch(error => {
        if (error?.res) {
          setShow({
            valueShow: false,
            message: "Server no response"
          })
          setDisabledbtn(true)
        }
        else if (error.res?.status === 400) {
          setShow({
            valueShow: false,
            message: "Server no response"
          })
          setDisabledbtn(true)
        }
        else if (error.res?.status === 404) {
          setShow({
            valueShow: false,
            message: "Unauthorized"
          })
        }
        else {
          setShow({
            valueShow: false,
            message: "Login failed"
          })
        }
      })

  };
  useEffect(() => {
    if (formData.user_nv !== "" && formData.pass_nv !== "") {
      setDisabledbtn(false)
    }
  }, [formData])
  
  if (loggedIn) {
    return <Navigate to="/" />;
  }
  const AlertDismissible = () => {
    if (show?.valueShow === true) {
      return (
        <Alert variant="danger" onClose={() => setShow({
          valueShow: false,
          message: ""
        })} dismissible>
          {
            show?.message
          }
        </Alert>
      );
    }
  }
  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary" hidden={propresslogin}>{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
  };
  function LinearWithValueLabel() {
    const [progress, setProgress] = React.useState(10);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
      }, 3000);
      return () => {
        clearInterval(timer);
      };
    }, []);

    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgressWithLabel value={progress} hidden={propresslogin} />
      </Box>
    );
  }
  return (
    <div class="main">
      <section class="signup">
        <div class="container">
          <div class="signin-content">
            <div class="signin-image">
              <figure><img src={imgSignin} alt="sing up image" /></figure>
              {/* <a href="#" class="signup-image-link">Create an account</a> */}
            </div>
            <div class="signin-form">
              <h2 class="form-title">Sign in</h2>
              <AlertDismissible />
              <div>
                <TextField
                  name="user_nv"
                  type="text"
                  fullWidth={true}
                  className="mb-3"
                  size="medium"
                  onChange={handleChange}
                  label="User Name"
                />
              </div>
              <div>
                <TextField
                  name="pass_nv"
                  type="password"
                  fullWidth={true}
                  className="mb-3"
                  size="medium"
                  onChange={handleChange}
                  label="Password"
                />
              </div>
              <div class="form-group form-button">
                <Button onClick={handleSubmit} variant="contained" disabled={Disabledbtn}>LOG IN</Button>
              </div>
              <div className="mb-3">
                <p>Account : administrator</p>
                <p>Password : Admin123</p>
              </div>
              <div>
                <p hidden={propresslogin}>Free web services use <a href="https://render.com/">Render</a> server</p>
                <p hidden={propresslogin}>Please wait 3 minute  to boost server !!!</p>
                <LinearWithValueLabel />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RightSide