import React, {useState, useContext} from 'react'
import { ShoppingCartContext } from '../../store/ShoppingCartProvider';
import { Trash, CircleX } from 'lucide-react';
import { useMobile, useDisableScroll } from '../../utils/Hooks';

const ShoppingCartDialog = ({onClose}) => {
 const { cart, setCart } = useContext(ShoppingCartContext)
 const [loading, setLoading] = useState(false)
 const isMobile = useMobile()

const handleClose = () => onClose()
useDisableScroll(true)    

const handleRemoveItem = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

const handleBuy = () => {
   if (!cart.length) return
    setLoading(true)
    setTimeout(()=>{
        alert(`Compra exitosa!`)
        setCart([])
        setLoading(false)
        onClose()
    },1500)
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
    aria-label='modal-carrito'
    >
        <div
        style={{
            background: '#f5f5f5',
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 5,
            height: isMobile ? '100%' : '400px',
            width: isMobile ? '100%' : '500px',
        }}
        >
            <div
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
            aria-label='titulo modal'
            >
                <h2
                style={{
                    color: '#333'
                }}
                >
                    Carrito de compras
                </h2>
                <button
                onClick={handleClose}
                style={{
                    color: '#333',
                    background: 'transparent'
                }}
                >
                    <CircleX />
                </button>
            </div>
            <div
            style={{
                height: '70%',
                maxHeight: '70%',
                overflowY: 'auto',
                scrollbarWidth: 'none'
            }}
            >
                {
                cart?.length > 0 ?  
                (
                    cart.map((product, index)=>(
                        <div
                        key={index}
                        aria-label={`producto ${index + 1}: ${product.title}`}
                        style={{
                            width: '100%',
                            height: '90px',
                            display: 'flex'
                        }}
                        >
                            <img 
                            src={`${product.image}`} 
                            style={{
                                width: '20%',
                                height: '90px'
                            }}
                            alt={`imagen de ${product.title}`}
                            />
                            <div
                            style={{
                                width: '70%',
                                height: '100px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent:'start',
                                marginLeft: 2,
                                color: '#333',
                                lineHeight: 0
                            }}
                            >
                                <p
                                style={{
                                    fontWeight: 'bold'
                                }}
                                >
                                    {product.title.slice(0,30) + '...'}
                                </p>
                                {
                                    product.quantity ? 
                                    (
                                        <p
                                style={{
                                    color: '#333'
                                }}
                                >
                                    {`Cantidad: ${product.quantity}`}
                                </p>
                                    
                                )
                                :
                                null
                                }
                                <p
                                style={{
                                    color: '#333'
                                }}
                                >
                                    {`Subtotal: $${product.quantity ? Number(product.quantity * product.price).toFixed(2) : product.price}`}
                                </p>
                            </div>
                            <button
                            aria-label='boton quitar producto de carrito'
                            onClick={()=>handleRemoveItem(index)}
                            style={{
                                width: '10%',
                                height: '100px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                padding: 0,
                                color: '#333',
                                background: 'transparent'
                            }}
                            >
                                <Trash/>
                            </button>
                        </div>
                    ))
                )
                :
                (
                    <p>
                        tu carrito está vacio
                    </p>
                )
            }
            </div>
            <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-evenly'
            }}
            >
            <button
            onClick={handleClose}
            disabled={loading}
            aria-label='boton cerrar'
            >
                cancelar
            </button>
            <button
            onClick={handleBuy}
            disabled={loading}
            aria-label='boton comprar'
            style={{
                background: 'linear-gradient(90deg,rgba(255, 94, 0, 1) 0%, rgba(237, 137, 78, 1) 50%, rgba(245, 159, 0, 1) 100%)',
                width: '100%',
                fontWeight: 'bold',
                cursor: 'pointer',
            }}
            >
                comprar
            </button>
            </div>
        </div>
    </div>
  )
}

export default ShoppingCartDialog