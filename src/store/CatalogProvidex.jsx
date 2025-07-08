import { useEffect, useState, useCallback, createContext } from "react"

export const Catalog = createContext()


 

export const CatalogProvider = ({children}) => {
const [data, setData] = useState([])
const [loading, setLoading] = useState(false)

    const fetchData = useCallback(async () =>{
        try{
          setLoading(true)  
          const response = await fetch('https://68681495d5933161d70abd39.mockapi.io/api/v1/product',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        setData(data)
        setLoading(false)
        } catch(e) {
            alert(`Error al cargar los productos`)
            setLoading(false)
            console.error(e)
        }
      },[])

    useEffect(()=>{
        fetchData()
      },[fetchData])

      return(
 
            <Catalog.Provider value={{ data, setData, loading }}>
              {children}
            </Catalog.Provider>

      )

}