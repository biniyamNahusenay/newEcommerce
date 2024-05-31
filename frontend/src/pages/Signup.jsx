import { useState } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./signup.css"
import { useSignupMutation } from '../services/appApi'

function Signup() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name,setName] = useState("")
  const [signup,{error,isLoading,isError}] = useSignupMutation()
  
  function handleSignup(e){
    e.preventDefault()
    signup({name,email,password})
  }
  
  return (
    <Container>
      <Row>
         <Col md={6} className='signup__form--container'>
            <Form style={{width:"100%"}} onSubmit={handleSignup}>
              <h1>create an account</h1>
              {isError && <Alert variant='danger'>{error.data}</Alert>}
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='enter you name' value={name} onChange={(e)=>setName(e.target.value)} required/>
              </Form.Group>

              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='enter email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='enter password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
              </Form.Group>

              <Form.Group>
                <Button type='submit' disabled={isLoading}>Signup</Button>
              </Form.Group>
               
               <p>already have an account?<Link to="/login">Login</Link></p>
            </Form>
         </Col>
         <Col md={6} className="signup__image--container"></Col>
      </Row>
    </Container>
  )
}

export default Signup
