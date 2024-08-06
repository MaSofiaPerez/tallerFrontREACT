

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Contenido from './Componentes/Contenido'
import BarraSuperior from './Componentes/BarraSuperior';


function App() {
  return (
    <div className='background'>
      <BarraSuperior />
      <Contenido/>
    </div>
  )
}

export default App
