import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { UserContext } from '../context/userContext';

function SignIn() {
    const [show, setShow] = useState(false);
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");

    const { getAllUsers, loginUser, setIsLoggedIn, verifyCurrentUser } = useContext(UserContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    function handleSubmit(e) {
        e.preventDefault();
        loginUser(usernameOrEmail, password).then(() => {
            handleClose();
            setUsernameOrEmail('');
            setPassword('');
            setIsLoggedIn(localStorage.getItem('myTrumpeterToken'));
            verifyCurrentUser();
            getAllUsers();
        }).catch(error => {
            console.log(error);
            window.alert('Failed login');
        });
    }

    return (
        <>
            <Button variant="link" className='nav-link text-light me-3' onClick={handleShow}>
                Sign In
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header className='bg-dark text-light' closeButton closeVariant='white'>
                    <Modal.Title className=''>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Username or Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="usernameOrEmail"
                                value={usernameOrEmail}
                                onChange={e => setUsernameOrEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <br />
                        <Button type="submit" variant="dark" className="btn btn-dark mb-2">Sign In</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SignIn;