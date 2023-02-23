import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

function SignUp() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    })

    let { username, password, firstName, lastName, email, phone } = newUser;
    const { createUser } = useContext(UserContext);
    const navigate = useNavigate();

    function handleChange(event) {
        setNewUser((preValue) => {
            return { ...preValue, [event.target.name]: event.target.value }
        })
    }
    function handleSubmit(event) {
        event.preventDefault();
        createUser(newUser).then(() => {
            handleClose();
            navigate('/');
        }).catch(error => {
            console.log(error);
            window.alert('Failed Sign up');
        });
    }

    return (
        <>
            <Button variant="warning"  onClick={handleShow}>
                Sign Up
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header className='bg-dark text-light' closeButton closeVariant='white'>
                    <Modal.Title className='' >Create Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Create a Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>Create a Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                className=""
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={handleChange}
                                className=""
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={handleChange}
                                className=""
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                className=""
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                name="phone"
                                value={phone}
                                onChange={handleChange}
                                className=""
                            />
                        </Form.Group>
                        <br />
                        <Button type="submit" variant="dark" className="btn btn-dark mb-2">Create Account</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SignUp;