import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import User from '../components/User';
import { UserContext } from '../context/userContext';


function Users() {

    const { users, getAllUsers } = useContext(UserContext);

    useEffect(() => {
        async function fetchData() {
            await getAllUsers();
        }
        fetchData()
    }, []);


    return (
        <Container className="mx-auto my-5 py-5">
            <Row className='text-center py-5'>
                <Col>
                    <h1>Trumpeter Users</h1>
                </Col>
            </Row>
            <Row className='mb-5'>
                <Col className='d-flex'>
                    <div><Link className="btn btn-dark" to={`search`}>Search Users</Link></div>
                </Col>
            </Row>
            <Row>
                {users.map(
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


export default Users;