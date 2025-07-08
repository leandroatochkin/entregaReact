import React, {useContext, useEffect, useState} from 'react'
import { HashLoader } from 'react-spinners'
import { Catalog } from '../../store/CatalogProvider'
import { v4 } from 'uuid'
import { useMobile } from '../../utils/Hooks'
import { useDisableScroll } from '../../utils/Hooks'


const AddProductDialog = ({product, onClose}) => {
const {loading, addProduct, editProduct} = useContext(Catalog)
const [payload, setPayload] = useState({
    id: v4(),
    category: '',
    title: '',
    description: '',
    price: '',
    image: ''
})

const isMobile = useMobile()
useDisableScroll(true)

useEffect(()=>{
    if(product){
        setPayload((prev)=>({
        ...prev,
        id: product.id,
        category: product.category,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image
    }))
    }
},[product])

const handleInputChange = (e) => {
  const { name, value } = e.target;

  setPayload((prev) => ({
    ...prev,
    [name]: name === "price" ? Number(value) || "" : value,
  }));
};

const handleSubmit = (e) => {
  e.preventDefault()
  const { category, title, description, price, image } = payload;

 
  if (!category || !title || !description || !price || !image) {
    alert("Todos los campos son obligatorios.")
    return
  }

  
  const titleRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9\s\-.,]{3,50}$/
  const priceRegex = /^\d+(\.\d{1,2})?$/
  const urlRegex = /^https?:\/\/.+$/


  if (!titleRegex.test(title)) {
    alert("El título no es válido. Solo letras, números, espacios y signos básicos.")
    return
  }

  if (!priceRegex.test(String(price))) {
    alert("El precio debe ser un número válido con hasta 2 decimales.")
    return
  }

  if (!urlRegex.test(image)) {
    alert("La URL de la imagen no es válida (debe comenzar con http:// o https://).")
    return
  }

  if (product) {
  editProduct(payload)
    } else {
  addProduct(payload) 
}
setPayload({
    id: v4(),
    category: '',
    title: '',
    description: '',
    price: '',
    image: ''
  })

  onClose()
}



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
            loading.adding 
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
            {
                product ? <h2 style={{color: '#333'}}>modificar producto</h2> : <h2 style={{color: '#333'}}>agregar producto</h2>
            }
            <input
                type="text"
                name="category"
                value={payload.category}
                onChange={handleInputChange}
                placeholder="Categoría"
                style={inputStyles}
            />

            <input
                type="text"
                name="title"
                value={payload.title}
                onChange={handleInputChange}
                placeholder="Título"
                style={inputStyles}
            />

            <textarea
                name="description"
                value={payload.description}
                onChange={handleInputChange}
                placeholder="Descripción"
                style={inputStyles}
            />

            <input
                type="number"
                name="price"
                value={payload.price}
                onChange={handleInputChange}
                placeholder="Precio"
                step="0.01"
                min="0"
                style={inputStyles}
            />

            <input
                type="url"
                name="image"
                value={payload.image}
                onChange={handleInputChange}
                placeholder="URL de la imagen"
                style={inputStyles}
            />
            <button
            type='button'
            onClick={onClose}
            >
              cancelar
            </button>
            <button
            type='submit'
            style={{
                background: 'linear-gradient(90deg,rgba(255, 94, 0, 1) 0%, rgba(237, 137, 78, 1) 50%, rgba(245, 159, 0, 1) 100%)',
                width: '40%',
                fontWeight: 'bold',
                cursor: 'pointer',
            }}
            >
              agregar
            </button>
        </form>
            )
        }
    </div>
  )
}

export default AddProductDialog