import { Container, Form, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { PlanContext } from '../contexts/PlanContext';
import { useNavigate } from 'react-router-dom';

export default function PlanFutureTrip() {
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [transport, setTransport] = useState("");
    const [budget, setBudget] = useState("");
    const [tripPlan, setTripPlan] = useState("");
    const toPlan = useContext(PlanContext).toPlan;
    const setToPlan = useContext(PlanContext).setToPlan;
    const navigate = useNavigate();

    const planTrip = (event) => {
        event.preventDefault();
        const newTrip = {
            id: Date.now(),
            destination,
            startDate,
            endDate,
            transport,
            budget,
            tripPlan
        };

        setToPlan([...toPlan, newTrip]);
        navigate("/");
    }
    return (
        <Container>
            <h1 className="my-5">Plan Your Upcoming Trip!</h1>
            <Form onSubmit={planTrip}>
                <Form.Group controlId="destination" className="mb-3">
                    <Form.Label>Place to Vacation</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter a place to travel"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required />
                </Form.Group>
                <Form.Group controlId="startDate" className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="endDate" className="mb-3">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="transport" className="mb-3">
                    <Form.Label>Transport</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Which transport choose to use"
                        value={transport}
                        onChange={(e) => setTransport(e.target.value)}
                        required />
                </Form.Group>
                <Form.Group controlId="budget" className="mb-3">
                    <Form.Label>Budget</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="100.00"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        required />
                </Form.Group>
                <Form.Group controlId="tripPlan" className="mb-3">
                    <Form.Label>Trip Plan</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Write about your trip plans"
                        value={tripPlan}
                        onChange={(e) => setTripPlan(e.target.value)}
                        required />
                </Form.Group>
                <Button variant="dark" type="submit">Plan</Button>

            </Form>
        </Container>
    )
}