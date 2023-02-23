import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


function User({ user }) {

    const navigate = useNavigate();

    const fullName = `${user.firstName} ${user.lastName}`;

    function handleViewProfile(userId) {
        navigate(`/users/${userId}`);
    }

    const isoDate = new Date(user.createdAt);
    const formatDate = Intl.DateTimeFormat('en-us', {
        dateStyle: "long",
        timeStyle: "short"
    });
    const createdDate = formatDate.format(isoDate);


    return (
        <Col xs={12} className="mb-5">
            <Card>
                <Card.Body className='p-3'>
                    <Card.Text className='mb-4 fs-4 fw-semibold'>{user.username}</Card.Text>
                    <Card.Text className='fs-6'>{fullName}</Card.Text>
                </Card.Body>
                <Card.Footer className='bg-warning d-flex justify-content-between'>
                    <div className='d-flex' >
                        <Button
                            onClick={handleViewProfile.bind(this, user.userId)}
                            variant="link"
                            className='nav-link text-dark'
                        >
                            View Profile
                        </Button>
                    </div>
                    <div>
                        <Card.Text >User since: {createdDate}</Card.Text>
                    </div>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default User;