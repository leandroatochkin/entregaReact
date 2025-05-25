import { useState, useEffect, useCallback, useContext } from "react";
import ProductCard from "../../components/cards/ProductCard";
import { useMobile } from "../../utils/Hooks";

const Splash = () => {
      const [data, setData] = useState([])
      const [loading, setLoading] = useState(false)
    

      const isMobile = useMobile()
    
      const fetchData = useCallback(async () =>{
        try{
          setLoading(true)  
          const response = await fetch('https://fakestoreapi.com/products',{
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
        console.log(data)
      },[fetchData])

  if (loading) return <div 
                        style={{
                            width: '100vw', 
                            height: '100%',
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center'}}>
                                cargando productos...
                        </div>

 if (!data) return <div 
                        style={{
                            width: '100vw', 
                            height: '100%',
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center'}}>
                                no hay productos para mostrar...
                        </div>    

  return (
    <div
    style={{
        paddingTop: '10vh',
        width: '96vw',
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: `repeat(${isMobile ? '1' : '4'}, 1fr)`,
        gap: '10px',
        margin: '1rem',
        overflowY: 'scroll',
        scrollbarWidth: 'none'
    }}
    >
        {
            data && data.map((product, index) =>(
                <ProductCard product={product} key={index} />
            ))
        }
    </div>
  )
}

export default Splash