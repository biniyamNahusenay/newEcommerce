import {Nav,Navbar,NavDropdown,Container} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import "./navigation.css"
import { useDispatch, useSelector } from "react-redux";

function Navigation() {
  const user = useSelector(state=>state.user)
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <LinkContainer to="/">
           <Navbar.Brand>Ecomern</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {
              !user && (<LinkContainer to="/login">
                        <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )
            }

            {
              user && (
                <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
                 {user.isAdmin && (
                   <>
                    <LinkContainer to='/dashboard'>
                     <NavDropdown.Item>Dashboard</NavDropdown.Item> 
                    </LinkContainer>
                    <LinkContainer to='/new-product'>
                     <NavDropdown.Item>Create Product</NavDropdown.Item> 
                    </LinkContainer>
                   </>
                  )}
                   {user.isAdmin && (
                   <>
                    <LinkContainer to='/cart'>
                     <NavDropdown.Item>Cart</NavDropdown.Item> 
                    </LinkContainer>
                    <LinkContainer to='/orders'>
                     <NavDropdown.Item>My orders</NavDropdown.Item> 
                    </LinkContainer>
                   </>
                  )}
                  <NavDropdown.Divider />
                  
              </NavDropdown>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;