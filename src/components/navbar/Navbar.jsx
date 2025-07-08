import { ShoppingBasket } from 'lucide-react'
import React, {useContext, useState} from 'react'
import { ShoppingCartContext } from '../../store/ShoppingCartProvider'
import ShoppingCartDialog from '../dialogs/ShoppingCartDialog'
import { Auth } from '../../store/AuthProvider'
import LoggedInDialog from '../dialogs/LoggedInDialog'

const Navbar = () => {
const [openDialog, setOpenDialog] = useState({
  shoppingCart: false,
  logIn: false,
  addProduct: false
})

const {cart} = useContext(ShoppingCartContext)
const {user} = useContext(Auth)


const handleDialog = (dialog, open) => {
  switch(dialog){
    case 'shoppingCart':
      setOpenDialog((prev)=>({
        ...prev,
        shoppingCart: open ? true : false
      }));
      break;
    case 'logIn':
      setOpenDialog((prev)=>({
        ...prev,
        logIn: open ? true : false
      }));
      break;
    case 'addProduct':
      setOpenDialog((prev)=>({
        ...prev,
        addProduct: open ? true : false
      }));
      break;
  }
}

  return (
    <>
    {
      (openDialog.shoppingCart && user.isLoggedIn) && <ShoppingCartDialog onClose={()=>handleDialog('shoppingCart', false)}/> 
    }
    {
      openDialog.logIn && !user.isLoggedIn && <LoggedInDialog onClose={()=>handleDialog('logIn', false)}/>
    }
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
          {
            user.role === 'admin' && (
              <button
              style={{
                border: 'none',
                background: 'transparent',
                color: 'black'
              }}
              onClick={
                ()=>handleDialog('addProduct', true)
              }
              >
                  agregar producto
              </button>
            )
          }
          {
            !user.isLoggedIn && (
              <button
              style={{
                border: 'none',
                background: 'transparent',
                color: 'black'
              }}
              onClick={
                ()=>handleDialog('logIn', true)
              }
              >
                  login
              </button>
            )
          }
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
          onClick={
            ()=>handleDialog('shoppingCart', true)
          }
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
    </>
  )
}

export default Navbar