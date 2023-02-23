import React, { useContext, useEffect, useState } from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import Message from '../components/Message';
import ProfileEdit from '../components/ProfileEdit';
import { MessageContext } from '../context/messageContext';
import { UserContext } from '../context/userContext'




function Profile() {
    const params = useParams();

    let [selectedUser, setSelectedUser] = useState({
        userId: params.userId,
        username: '',
        firstName: '',
        lastName: '',
        iat: 0,
        exp: 0
    });

    const { currentUser, getUser } = useContext(UserContext);
    const { messages } = useContext(MessageContext)

    const userMessages = messages.filter(message => message.userId === parseInt(params.userId));

    useEffect(() => {
        async function fetchData() {
            await getUser(selectedUser.userId).then((user) => setSelectedUser(user));
        }
        fetchData();
    }, [getUser, selectedUser.userId]);

    return (
        <Container className="mx-auto my-5 py-5">
            <Row className='py-3'>
                <Col>
                    <h2>Account Information</h2>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col className='d-flex'>
                {currentUser.userId === selectedUser.userId &&
                    <ProfileEdit user={selectedUser}/>}
                </Col>
            </Row>
            <Row className='mb-5'>
                <Col >
                    <Alert variant='warning'>
                        <div className='fs-4 mb-2'><span className='fw-semibold'>Username:</span> {selectedUser.username}</div>
                        <div className='fs-4 mb-2'><span className='fw-semibold'>First Name:</span> {selectedUser.firstName}</div>
                        <div className='fs-4 mb-2'><span className='fw-semibold'>Last Name:</span> {selectedUser.lastName}</div>
                        <div className='fs-4 mb-2'><span className='fw-semibold'>Email:</span> {selectedUser.email}</div>
                        <div className='fs-4 mb-2'><span className='fw-semibold'>Phone Number:</span> {selectedUser.phone}</div>
                    </Alert>
                </Col>
            </Row>
            <Row className='py-3'>
                <Col>
                    <h2>User Messages</h2>
                </Col>
            </Row>
            <Row className='mb-5'>
                {userMessages.map(
                    message => (
                        <Message
                            key={message.messageId}
                            message={message}
                        />
                    )
                )}
            </Row>
        </Container>
    )

}


export default Profile;