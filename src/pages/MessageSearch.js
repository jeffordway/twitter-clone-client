import React, { useContext } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import Message from '../components/Message'
import { MessageContext } from '../context/messageContext'

function MessageSearch() {

    const { setMessageQueryParams, messagesQueryResults, findMessages } = useContext(MessageContext);

    async function handleChange(event) {
        const encode = encodeURI(event.target.value);
        await setMessageQueryParams(encode);
        await findMessages();
    }


    return (
        <Container className="mx-auto my-5 py-5">
            <Row className='text-center py-5'>
                <Col>
                    <h1>Search Messages</h1>
                </Col>
            </Row>
            <Row className='mb-5'>
                <Form>
                    <Row className='d-flex'>
                        <Col>
                            <Form.Control
                                type="text"
                                name="encode"
                                placeholder='Search Messages'
                                onChange={handleChange}
                                className=""
                            />
                        </Col>
                    </Row>
                </Form>
            </Row>
            <Row>
                {messagesQueryResults.map(
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

export default MessageSearch