import { useState } from 'react';
import useLocalStorage from 'use-local-storage';
import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';

export default function BucketList() {
    const [place, setPlace] = useState("");
    const [bucketList, setBucketList] = useLocalStorage("bucketList", []);

    const addBucketList = (event) => {
        event.preventDefault();

        if (place) {
            const newPlace = {
                id: Date.now(),
                name: place,
                checked: false,
            };
            setBucketList([...bucketList, newPlace]);
            setPlace("");
        }
    };

    const toggleChecked = (id) => {
        const updatedList = bucketList.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setBucketList(updatedList);
    }

    const deletePlace = (id) => {
        const updatedList = bucketList.filter(item => item.id !== id);
        setBucketList(updatedList);
    };
    return (
        <Container className="my-5">
            <h1 className="my-4">My Bucket List</h1>
            <Form onSubmit={addBucketList}>
                <Form.Group controlId="place" className="mb-3">
                    <Form.Label>Place to Visit</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter a place you want to visit"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        required />
                </Form.Group>
                <Button variant="dark" type="submit">Add to Bucket List</Button>
            </Form>
            <div className="border p-3 rounded my-5 custom-border">
                <h2 className="my-4 text-center">Place to Visit</h2>
                <ListGroup>
                    {bucketList.length === 0 ? (
                        <p>No places in your bucket list yet</p>
                    ) : (
                        bucketList.map((item) => (
                            <ListGroup.Item key={item.id}>
                                <Row>
                                    <Col md={1} className="text-start">
                                        <Form.Check
                                            type="checkbox"
                                            checked={item.checked}
                                            onChange={() => toggleChecked(item.id)} />
                                    </Col>
                                    <Col>
                                        <span style={{ textDecoration: item.checked ? "line-through" : "none" }}>
                                            {item.name}
                                        </span>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="float-end"
                                            onClick={() => deletePlace(item.id)}>
                                            <i className="bi bi-trash3"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))
                    )}
                </ListGroup>
            </div>
        </Container>
    )
}