import React, { useContext } from 'react'
import { Button, Container, Nav, Navbar, } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import SignIn from './SignIn';
import SignUp from './SignUp';


function Navigation() {

    const { isLoggedIn, currentUser, logoutUser } = useContext(UserContext);
    const navigate = useNavigate();

    function handleClick() {
        logoutUser().then(() => {
        navigate('/');
        });
    }
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className='p-3'>
                <Container>
                    <Navbar.Brand href="#home">Trumpeter</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="/" className="nav-link">Messages</Link>
                            {isLoggedIn && <Link to="/users" className="nav-link">Users</Link>}
                        </Nav>
                        {isLoggedIn
                            ? <div className='text-light-emphasis me-3'> Hello {currentUser.firstName} {currentUser.lastName}!</div>
                            : <SignIn />
                        }

                        {isLoggedIn
                            ? <Button variant='light' onClick={handleClick}>Sign Out</Button>
                            : <SignUp />
                        }



                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation;