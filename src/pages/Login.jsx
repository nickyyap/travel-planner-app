import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    function login() {
        const isCorrectUsername = username === "nicky@gmail.com";
        const isCorrectPassword = password === "password";
        if (isCorrectUsername && isCorrectPassword) {
            authContext.setToken("1234");
            navigate("/");
        } else {
            alert("Incorrect username or password");
        }
    }

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center vh-100" >
                <Row className="w-100 justify-content-center">
                    <Col md={6} lg={4} className="p-4 border shadow-sm">
                        <h1 className="mb-4 text-center">Login</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@domain.com"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Passsword</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>

                            <Button variant="primary" type="submit" onClick={login} className="w-100">Login</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}