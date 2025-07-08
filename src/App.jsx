import Splash from './views/splash/Splash'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import { ShoppingCartProvider } from './store/ShoppingCartProvider'
import { AuthProvider } from './store/AuthProvider'
import { CatalogProvider } from './store/CatalogProvidex'

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
     <AuthProvider>
      <CatalogProvider>
      <ShoppingCartProvider>
          <Navbar />
          <Splash />
          <Footer />
      </ShoppingCartProvider>
      </CatalogProvider>
     </AuthProvider>
    </div>
  )
}

export default App
