import { useState } from 'react';
import useLocalStorage from 'use-local-storage';
import { Container, Form, Button, ListGroup, Card } from 'react-bootstrap';

export default function TravelDocument() {
    const [documentName, setDocumentName] = useState("");
    const [file, setFile] = useState(null);
    const [documents, setDocuments] = useLocalStorage("travelDocument", []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUploadDocument = (event) => {
        event.preventDefault();

        if (file && documentName) {
            const newDocument = {
                id: Date.now(),
                name: documentName,
                file: URL.createObjectURL(file),
            };

            setDocuments([...documents, newDocument]);
            setDocumentName("");
            setFile(null);
        } else {
            alert("Please provide a document name and select a file");
        }
    };

    const deleteDocument = (id) => {
        const updatedDocuments = documents.filter((document) => document.id !== id);
        setDocuments(updatedDocuments);
    }

    return (
        <Container>
            <h1 className="my-5">Upload Travel Documents</h1>
            <Form onSubmit={handleUploadDocument}>
                <Form.Group controlId="documentName" className="mb-3">
                    <Form.Label>Document Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter a name for the document (e.g., Flight Booking)"
                        value={documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
                        required />
                </Form.Group>
                <Form.Group controlId="file" className="mb-3">
                    <Form.Label>Upload Document</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleFileChange}
                        required />
                </Form.Group>
                <Button variant="dark" type="submit">Upload Document</Button>
            </Form>
            <div className="border p-3 rounded my-5 custom-border-doc custom-border">
                <h2 className="my-3 text-center">Travel Documents</h2>
                <ListGroup>
                    {documents.length === 0 ? (
                        <p>No documents uploaded yet</p>
                    ) : (
                        documents.map((document) => (
                            <ListGroup.Item key={document.id}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{document.name}<Button
                                            variant="danger"
                                            size="sm"
                                            className="float-end my-3"
                                            onClick={() => deleteDocument(document.id)}>
                                            <i className="bi bi-trash3"></i>
                                        </Button></Card.Title>
                                        <Card.Text>
                                            <a href={document.file} target="_blank" rel="noopener noreferrer">
                                                View Document
                                            </a>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </ListGroup.Item>
                        ))
                    )}
                </ListGroup>
            </div>
        </Container>
    )
};

