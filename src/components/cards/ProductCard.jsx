import React, {useContext} from 'react'
import { Star, ShoppingBag  } from 'lucide-react';
import { ShoppingCartContext } from '../../store/ShoppingCartProvider';

const ProductCard = ({product, handleFilter}) => {

const {setCart} = useContext(ShoppingCartContext)

const handleAddtoCart = () => {
    if(confirm(`Esta seguro que quiere agregar este producto al carrito?`)){
        if(!product) return
       setCart((prev) => {
            const existingIndex = prev.findIndex(item => item.id === product.id)

            if (existingIndex !== -1) {
 
                const updatedCart = prev.map((item, i) =>
                i === existingIndex
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
                return updatedCart
            } else {
                return [...prev, { ...product, quantity: 1 }]
            }
            })
        }}
  return (
    <div
    style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '20px',
        background: `url(${product.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: 8,
    }}
    >
        <h3
        style={{
            background: 'rgba(0,0,0,0.5)',
            padding: '5px',
            width: 'fit-content',
            borderRadius: 4
        }}
        >
            {product.title}
        </h3>
        <div
        style={{
            display: 'flex',
            flexDirection: 'row',
            background: '#f5f5f5',
            borderRadius: 8,
            padding: '5px',
            color: '#333',
            boxShadow: `10px 10px 75px -30px rgba(0,0,0,0.75)`
        }}
        >
            <div
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                padding: '10px',
            }}
            >
                <p>{`${product.description.slice(0,50)}...`}</p>
                <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
                >
                
                <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '5px',
                    lineHeight: 0.4,
                    width: '50%',
                }}
                >
                        <p
                        style={{
                            background: 'darkslategray',
                            color: '#f5f5f5',
                            padding: '10px',
                            width: 'fit-content',
                            borderRadius: 50,
                            cursor: 'pointer',
                        }}
                        onClick={handleFilter}
                        >
                            {product.category}
                        </p>
                        
                </div>
                
                <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50%',
                }}
                >
                    <h2>
                    {`AR$${Number(product.price).toFixed(2)}`}
                    </h2>
                    <button
                    onClick={handleAddtoCart}
                    style={{
                        background: 'linear-gradient(90deg,rgba(255, 94, 0, 1) 0%, rgba(237, 137, 78, 1) 50%, rgba(245, 159, 0, 1) 100%)',
                        width: '100%',
                        cursor: 'pointer',
                    }}
                    >
                        <ShoppingBag />
                    </button>
                </div>
       
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default ProductCard