import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import MessageNew from '../components/MessageNew';
import Message from '../components/Message'
import { MessageContext } from '../context/messageContext'
import { UserContext } from '../context/userContext';
import { Link } from 'react-router-dom';


function Messages() {

    const { messages } = useContext(MessageContext);
    const { isLoggedIn } = useContext(UserContext);

    return (
        <Container className="mx-auto my-5 py-5">
            <Row className='text-center py-5'>
                <Col>
                    <h1>Trumpeter Messages</h1>
                </Col>
            </Row>
            <Row className='mb-5'>
                <Col className='d-flex'>
                    { isLoggedIn &&
                        <div className='me-4'><MessageNew /></div>}
                    <div>
                    <Link className="btn btn-dark" to={`messages/search`}>Search Messages</Link>
                    </div>
                </Col>
            </Row>
            <Row>
                {messages.map(
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

export default Messages