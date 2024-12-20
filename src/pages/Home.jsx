import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { PlanContext } from '../contexts/PlanContext';

export default function Home() {
    const { toPlan, setToPlan } = useContext(PlanContext);


    const calculateDaysLeft = (startDate) => {
        if (!startDate) return 'No start date';
        const start = new Date(startDate);
        const current = new Date();
        const differenceInTime = start - current;
        return Math.max(Math.ceil(differenceInTime / (1000 * 60 * 60 * 24)), 0);
    };

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
                                    <p className={`text-center ${trip.startDate && calculateDaysLeft(trip.startDate) <= 5 ? 'text-danger' : 'text-dark'}`}>
                                        {trip.startDate ? (
                                            <>
                                                <span style={{ fontSize: "3rem", fontWeight: "bold", marginRight: "0.5rem", }} >{calculateDaysLeft(trip.startDate)}</span>
                                                <span style={{ fontSize: "1rem", fontWeight: "bold", }}>{calculateDaysLeft(trip.startDate) === 1 ? "Day Left" : "Days Left"}</span>
                                            </>
                                        ) : ("No start date available")}
                                    </p>
                                    <Card.Title className="fs-4 text-uppercase custom-color text-center text-secondary">{trip.destination}</Card.Title>
                                    <Card.Text>
                                        <span><b className="me-2">From </b> {trip.startDate}<b className="me-2 ms-2"> To </b> {trip.endDate}</span><br /><br />
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