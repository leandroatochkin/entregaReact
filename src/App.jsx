import Splash from './views/splash/Splash'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import { ShoppingCartProvider } from './store/ShoppingCartProvider'
import { AuthProvider } from './store/AuthProvider'
import { CatalogProvider } from './store/CatalogProvider'
import { ToastContainer, Bounce } from 'react-toastify';
import { Helmet } from 'react-helmet'

function App() {

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        height: '100dvh',
        width: '100vw',
      }}
    >
      <Helmet>
                <meta charSet="utf-8" />
                <title>ENTREGA REACT</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="entrega react C25017" />
                <meta name="author" content="Leandro" />
                <meta name="keywords" content="React, Productos, Carrito, E-commerce, App Demo" />
                <link rel="icon" href="/vite.svg" />
      </Helmet>
     <AuthProvider>
      <CatalogProvider>
      <ShoppingCartProvider>
          <Navbar />
          <Splash />
          <ToastContainer 
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
          />
          <Footer />
      </ShoppingCartProvider>
      </CatalogProvider>
     </AuthProvider>
    </div>
  )
}

export default App
