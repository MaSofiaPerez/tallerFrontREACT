import React from 'react'

const RegistroEventos = () => {
  return (
    <div id="registroEventos">
    <h1>Agregar Evento</h1>
    <label for="catEvento">Cateogoria</label>
    <input type="text" name="catEvento" id="catEvento"/>
    <label for="fechaHoraEvento">Fecha y Hora</label>
    <input type="datetime" name="fechaHoraEvento" id="fechaHoraEvento"/>
    <label for="detalleEvento">Detalles (opcional)</label>
    <textarea name="detalleEvento" id="detalleEvento"></textarea>
    <button type="submit">Agregar</button>
</div>
  )
}

export default RegistroEventos