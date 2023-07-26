
import { useState, useContext, useEffect } from "react";
import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import classnames from 'classnames/bind'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Request from '../../api/Request.js'
import { AuthContext } from "../../context/AuthContext.js";
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Navigate } from 'react-router-dom';
import * as style from './Login.module.scss'
const cx = classnames.bind(style)

const RightSide = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const [propresslogin, setProgress] = useState(true)

  const [formData, setFormData] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);

  const [show, setShow] = useState({
    valueShow: false,
    message: "hello world"
  });

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
        console.log(response)
        if (response.status === 200) {
          sessionStorage.setItem('access_token', response.data.access_token);
          setLoggedIn(true);
          setIsAuthenticated(true);
        }
        else {
          setShow({
            valueShow: true,
            message: response?.data?.message
          })
        }
      })
      .catch(error => {
        if (error?.res) {
          setShow({
            valueShow: false,
            message: "No server response"
          })
        }
        else if (error.res?.status === 400) {
          setShow({
            valueShow: false,
            message: "No server response"
          })
        }
        else if (error.res?.status === 401) {
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
    <Container className={cx('body1')}>

      <div className="mb-3">
        <section>
          <AlertDismissible />
          <h1 className="justify-content-md-center">SIGN IN</h1>
          <Form >
            <Form.Control
              placeholder="User Name"
              name="user_nv"
              type="text"
              id="inputPassword5"
              onChange={handleChange}
              className="mb-3"
            />
            <Form.Control
              placeholder="Password"
              name="pass_nv"
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              onChange={handleChange}
              className="mb-3"
            />
            <Stack className="col-md-7 mx-auto d-flex">
              <Button type='button' onClick={handleSubmit} variant="outline-primary">LOG IN</Button>
            </Stack>
            <div className="mb-3">
              <p>Account : admin  </p>
              <p>Password : admin123</p>
            </div>
          </Form>
          <div>
            <p hidden={propresslogin}>Please wait this may take some time to boost server</p>
            <LinearWithValueLabel />
          </div>
        </section>
      </div>

    </Container>
  )
}

export default RightSide