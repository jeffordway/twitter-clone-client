import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { UserContext } from '../context/userContext';


function ProfileEdit({ user }) {

    const [show, setShow] = useState(false);
    const [editUser, setEditUser] = useState({
        username: "",
        firstName: "",
        password: "",
        lastName: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        setEditUser(user);
    }, [user]);

    let { username, password, firstName, lastName, email, phone } = editUser;
    let { updateUser } = useContext(UserContext);

    let handleClose = () => setShow(false);
    let handleShow = () => setShow(true);

    function handleChange(event) {
        setEditUser((preValue) => {
            return { ...preValue, [event.target.name]: event.target.value }
        })
    }
    function handleSubmit(event) {
        event.preventDefault();
        updateUser(editUser).then(() => {
            handleClose();
        }).catch(error => {
            console.log(error);
            window.alert(error);
        });
    }

    return (
        <>
            <Button variant="warning" className='text-dark' onClick={handleShow}>
               Update Profile
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header className='bg-dark text-light' closeButton closeVariant='white'>
                    <Modal.Title className='' >Update Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Update Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={username}
                                onChange={handleChange}
                                className=""
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>Update Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                required
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
                        <Button type="submit" variant="dark" className="btn btn-dark mb-2">Update Account</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}


export default ProfileEdit;