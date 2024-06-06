import { useState } from 'react'
import {Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useLoginMutation } from '../services/appApi'
import "./signup.css"

function Login() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [login,{error,isLoading,isError}] = useLoginMutation()

  function handleLogin(e){
    e.preventDefault()
    login({email,password})
  }

  return (
    <Container>
      <Row>
         <Col md={6} className='login__form--container'>
            <Form style={{width:"100%"}} onSubmit={handleLogin}>
              <h1>Login to your account</h1>
              {isError && <Alert variant='danger'>{error.data}</Alert>}
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='enter email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='enter password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
              </Form.Group>

              <Form.Group>
                <Button type='submit' disabled={isLoading}>Login</Button>
              </Form.Group>
               
               <p>don't have an account?<Link to="/signup">Signup</Link></p>
            </Form>
         </Col>
         <Col md={6} className="login__image--container"></Col>
      </Row>
    </Container>
  )
}

export default Login
