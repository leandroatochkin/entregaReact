import { useState, useCallback, useEffect, useContext, createContext } from 'react'
import Splash from './views/splash/Splash'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import { ShoppingCart } from './store/Store'

function App() {
  const [count, setCount] = useState(0)
  


  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        height: '100dvh',
        width: '100vw',
      }}
    >
      <ShoppingCart.Provider value={[]}>
          <Navbar />
          <Splash />
          <Footer />
      </ShoppingCart.Provider>
    </div>
  )
}

export default App
