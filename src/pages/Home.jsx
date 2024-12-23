import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { PlanContext } from '../contexts/PlanContext';

export default function Home() {
    const { toPlan, setToPlan } = useContext(PlanContext);

    const deleteTripPlan = (id) => {
        const updatedTrips = toPlan.filter((trip) => trip.id !== id);
        setToPlan(updatedTrips);
    };

    return (
        <Container>
            <h1 className="my-5 mb-5 text-center">Welcome to Travel Planner App!</h1>
            <h2 className="text-center mb-4">Upcoming Trip</h2>
            <Row className="g-4">
                {toPlan.length === 0 ? (
                    <p>No trips planned yet!</p>
                ) : (
                    toPlan.map((trip, index) => (
                        <Col md={12} key={trip.id || index}>
                            <Card className="shadow-sm border-light rounded h-100">
                                <Card.Body>
                                    <Card.Title className="fs-4 text-uppercase custom-color text-center text-secondary">{trip.destination}</Card.Title>
                                    <Card.Text>
                                        <span><b className="me-2">From </b> {trip.startDate}<b className="me-2 ms-2"> To </b> {trip.endDate}</span><br /><br/>
                                        <b className="mb-2">Transport: </b> {trip.transport} <br /><br />
                                        <b>Budget: </b>RM {trip.budget} <br /><br />
                                        <b>Plan: </b> {trip.tripPlan}
                                    </Card.Text>
                                    <Button
                                        variant="danger ms-3"
                                        size="sm"
                                        className="float-end"
                                        onClick={() => deleteTripPlan(trip.id)}>
                                        <i className="bi bi-trash3"></i>
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="float-end"
                                        href={`planfuturetrip/${trip.id}`}>
                                        <i className="bi bi-pencil"></i>
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    )
}