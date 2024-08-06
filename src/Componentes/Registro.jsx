import React, { useRef, useEffect } from 'react'
import { useState } from "react"
import { Container, Form, Row, Col, Button, FormControl, FormGroup, FormLabel, Toast, ToastHeader, ToastBody } from 'react-bootstrap';



const Registro = () => {

  const [departamentos, setDepartamentos] = useState([])
  const baseURL = "https://babytracker.develotion.com/";
  const [idDepartamentoSeleccionado, setidDepartamentoSeleccionado] = useState(0);
  const [ciudades, setCiudades] = useState([])
  const [idCiudadSeleccionada, setidCiudadSeleccionada] = useState(0)
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('danger');

  useEffect(() => {
    fetch(baseURL + "departamentos.php")
      .then(r => r.json())
      .then(datos => {
        setDepartamentos(datos.departamentos);
      })

  }, []);


  useEffect(() => {
    if (idDepartamentoSeleccionado !== 0) {
      fetch(baseURL + `ciudades.php?idDepartamento=${idDepartamentoSeleccionado}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'e3953340d5dd70561141448e3ce5f52d',
          'iduser': 10
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.codigo !== 200) {
            console.log(data.mensaje);
            setToastMessage(data.mensaje);
            setToastVariant('danger');
            setShowToast(true);
            return;
          } else {
            setCiudades(data.ciudades);
          }
        })
        .catch(error => {
          console.log('Error al obtener ciudades: ' + error);
        });
    }
  }, [idDepartamentoSeleccionado]);

  const actualizarDepartamento = (e) => {
    setidDepartamentoSeleccionado(e.target.value)
  }

  const actualizarCiudad = (e) => {
    setidCiudadSeleccionada(e.target.value)
  }
  const nombreUsuario = useRef("")
  const constrasenaUsuario = useRef("")


  const TomarDatos = () => {

    const nombre = nombreUsuario.current.value;
    const contrasena = constrasenaUsuario.current.value;


    const datosRegistro = {
      usuario: nombre,
      password: contrasena,
      idDepartamento: idDepartamentoSeleccionado,
      idCiudad: idCiudadSeleccionada
    }

    fetch("https://babytracker.develotion.com/usuarios.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosRegistro)
    })
      .then(response => response.json())
      .then(data => {
        if (data.codigo == 200) {
         {/* console.log('Creado correctamente');*/}
          setToastMessage('Usuario creado correctamente');
          setToastVariant('success');
          setShowToast(true);
          console.log(data);
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
        console.log('Error al registrar usuario: ', error)
      });
  }

  const LimpiarCampos = () => {
    nombreUsuario.current.value = "";
    constrasenaUsuario.current.value = "";
    setidDepartamentoSeleccionado("");
    setidCiudadSeleccionada("");
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="registroUsuario">
        <h1 className='text-center mb-4'>Crear cuenta</h1>
        <Form>
          <Row>
            <Col>
              <FormGroup controlId="nombreUsuario">
                <FormLabel>Usuario</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Ingrese su usuario"
                  ref={nombreUsuario}
                  className="mb-2"
                />
              </FormGroup>
              <FormGroup controlId="constrasenaUsuario">
                <FormLabel>Contraseña</FormLabel>
                <FormControl
                  type="password"
                  placeholder="Ingrese su contraseña"
                  ref={constrasenaUsuario}
                  className="mb-2"
                />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup className='mb-3' controlId="departamentoUsuario">
            <FormLabel>Departamento</FormLabel>
            <FormControl
              as="select"
              onChange={actualizarDepartamento}
              value={idDepartamentoSeleccionado}
            >
              <option value="">Seleccione un Departamento</option>
              {departamentos.map((departamento) => (
                <option key={departamento.id} value={departamento.id}>
                  {departamento.nombre}
                </option>
              ))}
            </FormControl>
          </FormGroup>

          <FormGroup className='mb-3' controlId='ciudadUsuario'>
            <FormLabel>Ciudad</FormLabel>
            <FormControl
              as="select"
              onChange={actualizarCiudad}
              value={idCiudadSeleccionada}
            >
              <option vlue="">Seleccione Ciudad</option>
              {ciudades.map((ciudad) => (
                <option key={ciudad.id} value={ciudad.id}>
                  {ciudad.nombre}
                </option>
              ))}
            </FormControl>
          </FormGroup>

          <div className="d-grid gap-2">
            <Button variant="secondary" onClick={TomarDatos}>
              Registrarse
            </Button>
          </div>

          <p className='text-center mt-3'>¿Ya tienes una cuenta? <a href="#" className="link-inicio-sesion">Inicia Sesión</a></p>

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
}

export default Registro