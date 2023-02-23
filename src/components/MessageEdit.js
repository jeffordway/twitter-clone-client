import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { MessageContext } from '../context/messageContext';


function MessageEdit({ message }) {

    const [show, setShow] = useState(false);
    const [editMessage, setEditMessage] = useState({
        messageContents: "",
    })

    useEffect(() => {
        setEditMessage(message);
    }, [message]);

    let { messageContents  } = editMessage;
    let { updateMessage } = useContext(MessageContext);

    let handleClose = () => setShow(false);
    let handleShow = () => setShow(true);
    
    function handleChange(event) {
        setEditMessage((preValue) => {
            return { ...preValue, [event.target.name]: event.target.value }
        })
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        updateMessage(editMessage).then(() => {
            handleClose();
        }).catch(error => {
            console.log(error);
            window.alert(error);
        });
    }

    return (
        <>
            <Button variant="link" className='nav-link text-light' onClick={handleShow}>
               Edit Message
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

export default MessageEdit;