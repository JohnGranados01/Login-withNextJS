import { useEffect, useState } from "react";
import { ModalCustom } from "../src/components/Modal"
import { Container, Card, Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function dashboard() {
  const [firstTime, setFirstTime] = useState(false);
  useEffect(() => {
    const first_time = localStorage?.getItem('first_time') === 'true'
    setFirstTime(first_time)
  }, [])


  return (
    <div>
      {firstTime && (<ModalCustom setFirstTime={setFirstTime} firstTime={firstTime}></ModalCustom>)}
      
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="/">Cerrar Sesión</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Container>
          <br></br>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Resumén</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">$ 8,452,584.45 COP</Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
        
      </Container>
    </div>
  )
}
