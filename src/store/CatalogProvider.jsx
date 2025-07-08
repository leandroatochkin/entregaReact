import { useEffect, useState, useCallback, createContext } from "react"

export const Catalog = createContext()


 

export const CatalogProvider = ({children}) => {
const [data, setData] = useState([])
const [loading, setLoading] = useState({
  products: false,
  deleting: false,
  adding: false,
})

    const fetchProducts = useCallback(async () =>{
        try{
          setLoading((prev)=>({
            ...prev,
            products: true
          }))  
          const response = await fetch('https://68681495d5933161d70abd39.mockapi.io/api/v1/product',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        setData(data)
        } catch(e) {
            alert(`Error al cargar los productos`)
            setLoading((prev)=>({
            ...prev,
            products: false
          }))
            console.error(e)
        } finally {
          setLoading((prev)=>({
            ...prev,
            products: false
          }))
        }
      },[])
     
    const deleteProduct = async (productId) => {
      if(confirm(`Está seguro quiere eliminar este artículo?`)){
        setLoading((prev) => ({
        ...prev,
        deleting: true
      }))

      try {
        const response = await fetch(`https://68681495d5933161d70abd39.mockapi.io/api/v1/product/${productId}`, {
          method: 'DELETE'
        })

        if (!response.ok) {
          alert("Error al eliminar artículo.");
          return;
        }

        alert("Artículo eliminado.");
        setData((prevData) => prevData.filter((item) => item.id !== productId));

      } catch (e) {
        alert("Error al eliminar artículo.");
        console.error(e);
      } finally {
        setLoading((prev) => ({
          ...prev,
          deleting: false
        }))
      }
      } return
    }

    const addProduct = async (product) => {
      if(confirm(`Está seguro quiere agregar este artículo?`)){
        try{
          setLoading((prev) => ({
          ...prev,
          adding: true
        }))
        const response = await fetch(`https://68681495d5933161d70abd39.mockapi.io/api/v1/product`,{
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(product)
        })
        if(!response.ok){
          alert(`Error al agregar artículo.`)
        }
        fetchProducts()
        } catch(e) {
          console.error(e)
          alert(`Error al agregar artículo.`)
        } finally {
          setLoading((prev) => ({
          ...prev,
          adding: false
        }))
        }
            } return
    }

    

    useEffect(()=>{
        fetchProducts()
      },[fetchProducts])

      return(
 
            <Catalog.Provider value={{ data, setData, loading, deleteProduct, addProduct }}>
              {children}
            </Catalog.Provider>

      )

}