import { useContext } from "react";
import { Catalog } from "../../store/CatalogProvider";
import ProductCard from "../../components/cards/ProductCard";
import { useMobile } from "../../utils/Hooks";


const Splash = () => {

    

      const isMobile = useMobile()
      const {data, loading, deleteProduct} = useContext(Catalog)
       console.log(loading)

  if (loading.products) return <div 
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
                <ProductCard product={product} key={index} handleDelete={deleteProduct}/>
            ))
        }
    </div>
  )
}

export default Splash