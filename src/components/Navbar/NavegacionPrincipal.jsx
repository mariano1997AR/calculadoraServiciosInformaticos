import Container from "react-bootstrap/Container";
import Navbar from 'react-bootstrap/Navbar';
import './NavegacionPrincipal.css';

export const NavegacionPrincipal = () => {
    return (
        <>
            <Navbar className="p-3 " id="fondo">
                <Container>
                    <Navbar.Brand><h2 className="text-white"><b>Calculadora</b></h2></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Diseñado por <a href="https://www.linkedin.com/in/mariano-martinotti-53962b156/" target="_blank">Mariano Martinotti</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}


