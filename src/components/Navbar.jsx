import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap'


export default function NavBar() {
    const { token, setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand as={NavLink} to="/" style={{ color: "white" }}>Travel Planner</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="nasic-navbar-nav">
                    <Nav className="me-auto">
                        {!token && <Nav.Link as={NavLink} to="/login" style={{ color: "white" }}>Login</Nav.Link>}
                        {token && <Nav.Link as={NavLink} to="/dashboard" style={{ color: "white" }}>Dashboard</Nav.Link>}
                        {token && <Nav.Link as={NavLink} to="/packinglist" style={{ color: "white" }}>Packing List</Nav.Link>}
                        {token && <Nav.Link as={NavLink} to="/planfuturetrip" style={{ color: "white" }}>Plan Future Trip</Nav.Link>}
                        {token && <Nav.Link as={NavLink} to="/traveldocument" style={{ color: "white" }}>Documents</Nav.Link>}
                        {token && <Nav.Link as={NavLink} to="/bucketlist" style={{ color: "white" }}>Bucket List</Nav.Link>}
                    </Nav>
                    {token && (<Button variant="danger" onClick={logout}>Logout</Button>)}
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}