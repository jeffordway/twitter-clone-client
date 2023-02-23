import React, { useContext } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import User from '../components/User';
import { UserContext } from '../context/userContext';

function UserSearch() {


    const { setUserQueryParams, usersQueryResults, findUsers } = useContext(UserContext);

    async function handleChange(event) {
        const encode = encodeURI(event.target.value);
        await setUserQueryParams(encode);
        await findUsers();
    }


    return (
        <Container className="mx-auto my-5 py-5">
            <Row className='text-center py-5'>
                <Col>
                    <h1>Search Users</h1>
                </Col>
            </Row>
            <Row className='mb-5'>
                <Form>
                    <Row className='d-flex'>
                        <Col>
                            <Form.Control
                                type="text"
                                name="encode"
                                placeholder='Search Users'
                                onChange={handleChange}
                                className=""
                            />
                        </Col>
                    </Row>
                </Form>
            </Row>
            <Row>
                {usersQueryResults.map(
                    user => (
                        <User
                            key={user.userId}
                            user={user}
                        />
                    )
                )}
            </Row>
        </Container>
    )
}


export default UserSearch;