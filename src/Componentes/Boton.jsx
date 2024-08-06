import {Button} from 'react-bootstrap'

const Boton = ({onClick, name, disabled}) => {
  return (
    <div className="d-grid gap-2">
    <Button variant="secondary" onClick={onClick} disabled={disabled}>
      {name}
    </Button>
  </div>
  )
}

export default Boton