
import { useState, useRef, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider.js";

import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import classnames from 'classnames/bind'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Request from '../../api/Request.js'

import { Navigate } from 'react-router-dom';
import * as style from './Login.module.scss'
const cx = classnames.bind(style)



const RightSide = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState('');

  const [formData, setFormData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

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
      .then(res => {
        sessionStorage.setItem("access_token", res.data.access_token)
        setTimeout(1000)
        setLoggedIn(true)
        const access_token = res.data.access_token
        setAuth({ access_token })

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

        errRef.currentfocus();
      });
  };

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Container className={cx('body1')}>

      <div className="mb-3">
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive" >{errMsg}</p>
          <h1>Sign In</h1>
          <Form onSubmit={handleSubmit} >
            <Form.Label htmlFor="inputPassword5">User Name</Form.Label>
            <Form.Control
              name="user_nv"
              type="text"
              id="inputPassword5"
              onChange={handleChange}
              ref={userRef}
            />
            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
              name="pass_nv"
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              onChange={handleChange}
            />
            <Stack className="col-md-7 mx-auto d-flex">
              <Button type='submit' variant="outline-success">Save changes</Button>
            </Stack>
          </Form>
        </section>
      </div>

    </Container>
  )
}

export default RightSide