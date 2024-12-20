import { useState, useContext } from 'react';
import { TravelContext } from '../contexts/TravelContext';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';

export default function PackingList() {
    const [title, setTitle] = useState("");
    const [item, setItem] = useState("");
    const [list, setList] = useState([]);
    const setToPack = useContext(TravelContext).setToPack;
    const toPack = useContext(TravelContext).toPack;
    const navigate = useNavigate();

    function addItemToList(event) {
        event.preventDefault();
        if (item) {
            setList([...list, { name: item, completed: false }]);
            setItem("");
        }
    }

    const toggleItemCompletion = (index) => {
        const updatedList = list.map((listItem, idx) =>
            idx === index ? { ...listItem, completed: !listItem.completed } : listItem
        );
        setList(updatedList);
    };

    function addToPack(event) {
        event.preventDefault();
        // Ensure list is always an array
        const newList = Array.isArray(list) ? list : [];
        setToPack([...toPack, { id: Date.now(), title, list: newList }]);
        navigate("/dashboard");
    }

    return (
        <Container>
            <h1 className="my-3">Add Packing List</h1>
            <Form onSubmit={addToPack}>
                <Form.Group controlId="title" className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Vacation"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required />
                </Form.Group>

                <Form.Group controlId="item" className="mb-3">
                    <Form.Label>Packing Item</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Sunscreen"
                        value={item}
                        onChange={(e) => setItem(e.target.value)} />
                </Form.Group>

                <Button variant="secondary" onClick={addItemToList}>Add Item</Button>

                <ListGroup className="my-3">
                    {list.map((listItem, index) => (
                        <ListGroup.Item key={index}>
                            <input
                                type="checkbox"
                                checked={listItem.completed}
                                onChange={() => toggleItemCompletion(index)}
                                className="me-2" />
                            {listItem.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <Button variant="primary" type="submit">Add</Button>
            </Form>
        </Container>
    )
}