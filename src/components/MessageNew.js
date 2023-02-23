import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MessageContext } from '../context/messageContext';
import { UserContext } from '../context/userContext';


function MessageNew() {
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => 
    {setShow(true)
        console.log(users);
        console.log(currentUser);
    };

    const [newMessage, setNewMessage] = useState({
        messageContents: "",
    })

    let { messageContents } = newMessage;
    const { createMessage } = useContext(MessageContext);
    const { users, currentUser} = useContext(UserContext);

    function handleChange(event) {
        setNewMessage((preValue) => {
            return { ...preValue, [event.target.name]: event.target.value }
        })
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        createMessage(newMessage).then(() => {
            handleClose();
        }).catch(error => {
            console.log(error);
            window.alert('Cannot post new Message');
        });
    }

    return (
        <>
            <Button variant="warning" className='text-dark' onClick={handleShow}>
               Create Message
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header className='bg-dark text-light' closeButton closeVariant='white'>
                    <Modal.Title className=''>Create New Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>New Message</Form.Label>
                            <Form.Control
                                as="textarea" 
                                rows={3}
                                name="messageContents"
                                value={messageContents}
                                onChange={handleChange}
                                className=""
                            />
                        </Form.Group>
                        <br />
                        <Button type="submit" variant="dark" className="btn btn-dark mb-2">Save Message</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default MessageNew;