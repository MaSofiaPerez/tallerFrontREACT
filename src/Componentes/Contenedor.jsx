import 'bootstrap/dist/js/bootstrap.bundle.min';
import Contenido from './Contenido';
import Header from './Header';
import Footer from './Footer';

const Contenedor = () => {
  return (
    <div>
      <header>
       <Header />
      </header>
      <main>
        <Contenido />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>

  )
}

export default Contenedor