import { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./signup.css"

function Login() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  return (
    <Container>
      <Row>
         <Col md={6} className='login__form--container'>
            <Form style={{width:"100%"}}>
              <h1>Login to your account</h1>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='enter email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='enter password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
              </Form.Group>

              <Form.Group>
                <Button type='submit'>Login</Button>
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
