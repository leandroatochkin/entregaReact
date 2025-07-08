import React, {useState, useContext} from 'react'
import { Auth } from '../../store/AuthProvider'
import { useMobile } from '../../utils/Hooks'
import { HashLoader } from 'react-spinners'

const LoggedInDialog = ({onClose}) => {
const isMobile = useMobile()
const { handleLogin } = useContext(Auth)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    setTimeout(()=>{
        handleLogin(email, password)
        setLoading(false)
    },1000)
  };

  const inputStyles = {
                background: '#333',
                color: '#f5f5f5',
                fontWeight: 'medium',
                fontSize: '18px',
                padding: 4,
                borderRadius: 4,
                border: 'none',
                width: '80%',
                height: '40px'
            }

  return (
     <div
    style={{
        height: '100dvh',
        width: '100vw',
        zIndex: '10',
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
    }}
    aria-label='modal-log-in'
    >
   
        {
            loading 
            ?
            <HashLoader />
            :
            (
        <form
        onSubmit={handleSubmit}
        style={{
            background: '#f5f5f5',
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: 5,
            height: isMobile ? '100%' : '400px',
            width: isMobile ? '100%' : '500px',
        }}
        >
                 <h2
                 style={{
                    color: '#333'
                 }}
                 >LOGIN</h2>
            <input 
            type="email" 
            placeholder="Email" 
            onChange={(e) => setEmail(e.target.value)} 
            style={inputStyles}
            />
            <input 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)} 
            style={inputStyles}
            />
            <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-evenly'
            }}
            >
            <button
            type='button'
            onClick={onClose}
            disabled={loading}
            aria-label='boton cerrar'
            >
                cancelar
            </button>
            <button
            type='submit'
            disabled={loading}
            aria-label='boton comprar'
            style={{
                background: 'linear-gradient(90deg,rgba(255, 94, 0, 1) 0%, rgba(237, 137, 78, 1) 50%, rgba(245, 159, 0, 1) 100%)',
                width: '40%',
                fontWeight: 'bold',
                cursor: 'pointer',
            }}
            >
                login
            </button>
            </div>
        </form>
            )
        }
    </div>
  )
}

export default LoggedInDialog