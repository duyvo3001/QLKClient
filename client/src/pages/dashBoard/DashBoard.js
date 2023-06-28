import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const DashBoard = () => {
    return (
        <Container>
            <Row className="mb-3">
                <h4>Home : Dash Board</h4>
            </Row>
            <Row  className="justify-content-md-center">
                <Col className="mb-3" md="auto">
                    <Card
                        style={{ width: '16rem' }}
                        key='Success'
                        bg='success'
                        text='light'
                    >
                        <Card.Body>
                            <Card.Title>1</Card.Title>
                            <Card.Text>
                                Total Products
                            </Card.Text>
                            <Button  href="/ProductView" variant="light">More info</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-3" md="auto">
                    <Card
                        style={{ width: '16rem' }}
                        key="Primary"
                        bg='warning'
                        text="light"
                    >
                        <Card.Body>
                            <Card.Title>2</Card.Title>
                            <Card.Text>
                                Total Paid Orders
                            </Card.Text>
                            <Button href="/PaidView"  variant="light">More info</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-3" md="auto">
                    <Card
                        style={{ width: '16rem' }}
                        key="Primary"
                        bg='danger'
                        text="light"
                    >
                        <Card.Body>
                            <Card.Title>3</Card.Title>
                            <Card.Text>
                                Total Users
                            </Card.Text>
                            <Button href="/UserView"  variant="light">More info</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-3" md="auto">
                    <Card
                        style={{ width: '16rem' }}
                        key="Primary"
                        bg="info"
                        text="light"
                    >
                        <Card.Body>
                            <Card.Title>4</Card.Title>
                            <Card.Text>
                                Total WareHouse
                            </Card.Text>
                            <Button href="/WareHouseView"  variant="light">More info</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default DashBoard