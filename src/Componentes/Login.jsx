import React, { useRef, useState } from 'react';
import {Container, Row, Form, Col, FormGroup, FormLabel, FormControl, Button, Toast, ToastBody } from 'react-bootstrap'

const Login = () => {
  const baseURL = "https://babytracker.develotion.com/";
  const nombreUsuario = useRef("");
  const contrasenaUsuario = useRef("");
  const [botonHabilitado, setbotonHabilitado] = useState(true)
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('danger');

  const verificarContenido = () => {
    const nombre = nombreUsuario.current.value;
    const contrasena = contrasenaUsuario.current.value;
    setbotonHabilitado(!(nombre && contrasena))
  }

  const TomarDatos = (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

    const nombre = nombreUsuario.current.value;
    const contrasena = contrasenaUsuario.current.value;

    const datosRegistro = {
      usuario: nombre,
      password: contrasena
    };
    fetch(baseURL + 'login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosRegistro)
    })
      .then(response => response.json())
      .then(data => {
        if (data.codigo == 200) {
          console.log(data)
          localStorage.setItem('apikey', data.apiKey);
          localStorage.setItem('iduser', data.id);
          LimpiarCampos();
        } else {
          console.log(data.mensaje)
          LimpiarCampos();
          setToastMessage(data.mensaje);
          setToastVariant('danger');
          setShowToast(true);
        }
      })
      .catch(error => {
        console.log('Error al iniciar sesión: ' + error);
      });
  };

  const LimpiarCampos = () => {
    nombreUsuario.current.value = "";
    contrasenaUsuario.current.value = "";
  }

  return (

    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="loginUsuario">
        <h1 className='text-center mb-4'>Iniciar Sesión</h1>
        <Form>
          <Row>
            <Col>
              <FormGroup controlId="nombreUsuarioLogin">
                <FormLabel>Usuario</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Nombre de usuario"
                  onChange={verificarContenido}
                  ref={nombreUsuario}
                  className="mb-2"
                />
              </FormGroup>
              <FormGroup controlId="constrasenaUsuarioLogin">
                <FormLabel>Contraseña</FormLabel>
                <FormControl
                  type="password"
                  placeholder="Contraseña"
                  onChange={verificarContenido}
                  ref={contrasenaUsuario}
                  className="mb-2"
                />
              </FormGroup>
            </Col>
          </Row>

          <div className="d-grid gap-2">
            <Button variant="secondary" disabled={botonHabilitado} onClick={TomarDatos}>
              Ingresar
            </Button>
          </div>
          <p className='text-center mt-3'>¿Es tu primera vez? <a href="#" className="link-inicio-sesion">¡Registrate!</a></p>

          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            delay={5000}
            autohide
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: '1'
            }}
            className={`bg-${toastVariant}`}
          >
            <ToastBody><strong>{toastMessage}</strong></ToastBody>
          </Toast>
        </Form>
      </div>
    </Container>

  )
  {/*<div id="loginUsuario">
      <h1>Iniciar Sesión</h1>
      <p>¿Es tu primera vez? <a href="/">¡Regístrate!</a></p>
      <form method="post" >
        <input type="text" onChange={verificarContenido} id="nombreUsuarioLogin" ref={nombreUsuario} placeholder="Usuario" />
        <input type="password" onChange={verificarContenido}  id="pswUsuarioLogin" ref={contrasenaUsuario} placeholder="Contraseña" />
        <button type="submit" disabled={botonHabilitado} onClick={TomarDatos}>Ingresar</button>
      </form>
    </div>*/}
};

export default Login;
