import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { TravelContext } from '../contexts/TravelContext';
import { useContext } from 'react';

export default function Dashboard() {
    const { toPack, setToPack } = useContext(TravelContext);

    const toggleItemCompletion = (itemId, index) => {
        const updatedToPack = toPack.map(item => {
            if (item.id === itemId) {
                //Array.isArray(item.list) - Before calling .map() on item.list, ensure it is an array
                const updatedList = Array.isArray(item.list) ? item.list.map((listItem, idx) =>
                    idx === index ? { ...listItem, completed: !listItem.completed } : listItem
                ) : [];
                return { ...item, list: updatedList }
            }
            return item;
        });
        setToPack(updatedToPack);
    };

    const deleteListItem = (itemId, index) => {
        const updatedToPack = toPack.map(item => {
            if (item.id === itemId) {
                const updatedList = Array.isArray(item.list) ? item.list.filter((_, idx) => idx !== index) : [];
                return { ...item, list: updatedList };
            }
            return item;
        });
        setToPack(updatedToPack);
    };

    const deletePackingList = (itemId) => {
        const updatedToPack = toPack.filter(item => item.id !== itemId);
        setToPack(updatedToPack);
    };

    return (
        <Container>
            <h1 className="my-5 text-center">Pack List</h1>
            <Row>
                {toPack.length === 0 ? (
                    <p>No items to pack yet!</p>
                ) : (
                    toPack.map((item) => (
                        <Col key={item.id} md={6}>
                            <Card className="shadow-sm border-light rounded h-100">
                                <Card.Body>
                                    <Card.Title className="text-secondary fs-4 text-uppercase">{item.title}
                                        <Button
                                            variant="danger ms-3"
                                            size="sm"
                                            className="float-end"
                                            onClick={() => deletePackingList(item.id)}>
                                            DELETE
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="float-end"
                                            href={`packinglist/${item.id}`}>
                                            EDIT
                                        </Button>
                                    </Card.Title>
                                    <ListGroup className="my-3">
                                        {/*Array.isArray(item.list): This ensures that .map() is only called if item.list is an array.*/}
                                        {Array.isArray(item.list) && item.list.length > 0 ? (
                                            item.list.map((listItem, index) =>
                                                <ListGroup.Item className="border p-3 rounded" key={index}>
                                                    <input
                                                        type="checkbox"
                                                        checked={listItem.completed}
                                                        onChange={() => toggleItemCompletion(item.id, index)}
                                                        className="me-2" />
                                                    <span style={{ textDecoration: listItem.completed ? "line-through" : "none" }}>
                                                        {listItem.name}
                                                    </span>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        className="float-end"
                                                        onClick={() => deleteListItem(item.id, index)}>
                                                        <i className="bi bi-trash3"></i>
                                                    </Button>
                                                </ListGroup.Item>
                                            )
                                        ) : (
                                            <p>No items in this list.</p>
                                        )}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
}
