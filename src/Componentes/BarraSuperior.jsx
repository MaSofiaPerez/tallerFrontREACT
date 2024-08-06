import {Navbar, Nav, NavbarBrand, Container, NavLink, NavbarToggle, NavbarCollapse } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const BarraSuperior = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
        <NavbarBrand href="#home">BabyTracker</NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink href="#logout">Cerrar Sesión</NavLink>
          </Nav>
        </NavbarCollapse>
        </Container>
      </Navbar>
  )
}

export default BarraSuperior