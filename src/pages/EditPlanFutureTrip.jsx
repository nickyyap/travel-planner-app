import { Container, Form, Button } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import { PlanContext } from '../contexts/PlanContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPlanFutureTrip() {
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [transport, setTransport] = useState("");
    const [budget, setBudget] = useState("");
    const [tripPlan, setTripPlan] = useState("");
    const toPlan = useContext(PlanContext).toPlan;
    const setToPlan = useContext(PlanContext).setToPlan;
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        console.log("ID from URL:", id);  // Debug log the id
        console.log("To Plan Data:", toPlan); // Check if
        if (id && toPlan.length > 0) {
            const trip = toPlan.find((trip) => trip.id === parseInt(id));
            console.log(trip);
            if (trip) {
                setDestination(trip.destination);
                setStartDate(trip.startDate);
                setEndDate(trip.endDate);
                setTransport(trip.transport);
                setBudget(trip.budget);
                setTripPlan(trip.tripPlan);
            }
        }
    }, [id, toPlan]);

    const updateTrip = (event) => {
        event.preventDefault();
        const updatedTrip = {
            id: parseInt(id),
            destination,
            startDate,
            endDate,
            transport,
            budget,
            tripPlan
        };

        const updatedTrips = toPlan.map((trip) =>
            trip.id === updatedTrip.id ? updatedTrip : trip
        );

        setToPlan(updatedTrips);
        navigate("/");
    };
    return (
        <Container>
            <h1 className="my-3">Plan Your Upcoming Trip!</h1>
            <Form onSubmit={updateTrip}>
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
                <Button variant="primary" type="submit">Plan</Button>

            </Form>
        </Container>
    )
}