
import { useState, useRef, useEffect, useContext } from "react";
import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import classnames from 'classnames/bind'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Request from '../../api/Request.js'
import { AuthContext } from "../../context/AuthContext.js";
import Alert from 'react-bootstrap/Alert';

import { Navigate } from 'react-router-dom';
import * as style from './Login.module.scss'
const cx = classnames.bind(style)



const RightSide = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState('');

  const [formData, setFormData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [show, setShow] = useState({
    valueShow: false,
    message: ""
});
  useEffect(() => {
    userRef.current.focus()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Request.post('/signin', { formData }, { headers: { 'Authorization': sessionStorage.getItem("access_token") } },
    )
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem('access_token', res.data.access_token);
          setLoggedIn(true);
          setIsAuthenticated(true);
        }
      })
      .catch(error => {
        if (error?.res)
          setErrMsg('No server response')
        else if (error.res?.status === 400)
          setErrMsg('No server response')
        else if (error.res?.status === 401)
          setErrMsg('Unauthorized')
        else
          setErrMsg('Login failed')

        errRef.current.focus();
      });
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

  return (
    <Container className={cx('body1')}>

      <div className="mb-3">
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive" >{errMsg}</p>
          <h1 className="justify-content-md-center">SIGN IN</h1>
          <Form onSubmit={handleSubmit} >
            <Form.Control
              placeholder="User Name"
              name="user_nv"
              type="text"
              id="inputPassword5"
              onChange={handleChange}
              ref={userRef}
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
              <Button type='submit' variant="outline-success">LOG IN</Button>
            </Stack>
          </Form>
        </section>
      </div>

    </Container>
  )
}

export default RightSide