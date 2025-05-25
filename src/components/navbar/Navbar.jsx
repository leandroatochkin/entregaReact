import { ShoppingBasket } from 'lucide-react'
import React, {useContext} from 'react'
import { ShoppingCart } from '../../store/Store'

const Navbar = () => {

const cart = useContext(ShoppingCart)

  return (
    <div
    style={{
        width: '100vw',
        height: '10vh',
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(10px)',
        position: 'fixed',
        top: '0',
        left: '0',
        color: '#333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }}
    >
      <h2>
        TF123
      </h2>
      <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '20%',
      }}
      >
          <button
          style={{
            border: 'none',
            background: 'transparent',
            color: 'black'
          }}
          >
              login
          </button>
          <button
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'transparent',
            color: 'black',
            width: '100px',
            height: '50px',
          }}
          >
            <ShoppingBasket />
            <p
            style={{
              padding: 5,
              background: 'red',
              borderRadius: 4,
              color: 'white',
            }}
            >{cart.length}</p>
          </button>
      </div>
    </div>
  )
}

export default Navbar