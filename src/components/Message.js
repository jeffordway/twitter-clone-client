import React, { useContext } from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { MessageContext } from '../context/messageContext';
import { UserContext } from '../context/userContext';
import MessageEdit from './MessageEdit';

function Message({ message }) {

    const { deleteMessage } = useContext(MessageContext);
    const { currentUser } = useContext(UserContext);

    const fullName = `${message.User.firstName} ${message.User.lastName}`;

    
    const isoDate = new Date(message.createdAt);
    const formatDate = Intl.DateTimeFormat('en-us', {
        dateStyle: "long",
        timeStyle: "short"
    });
    const createdDate = formatDate.format(isoDate);




    return (
        <Col xs={12} className="mb-5">
            <Card>
                <Card.Body className='d-flex p-3'>
                    <Card.Text className='me-2 fs-6 fw-semibold'>{fullName}:</Card.Text>
                    <Card.Text className='fs-6 fw-normal'>{message.messageContents}</Card.Text>
                </Card.Body>
                <Card.Footer className='bg-dark text-light d-flex justify-content-between'>
                    <div className='d-flex' >
                    {currentUser.userId === message.userId &&
                        <div className='me-3'>
                            <MessageEdit
                                message={message}
                            />
                        </div>
                        }
                        {currentUser.userId === message.userId &&
                        <Button
                            onClick={deleteMessage.bind(this, message.messageId)}
                            variant="link"
                            className='nav-link text-light'
                        >
                            Delete Message
                        </Button>
                        }
                    </div>
                    <div>
                        <Card.Text >Created at: {createdDate}</Card.Text>
                    </div>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default Message;