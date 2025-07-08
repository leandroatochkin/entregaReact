import { useContext, useState } from "react";
import { Catalog } from "../../store/CatalogProvider";
import ProductCard from "../../components/cards/ProductCard";
import { useMobile } from "../../utils/Hooks";
import AddProductDialog from "../../components/dialogs/AddProductDialog";


const Splash = () => {
const [openEditDialog, setOpenEditDialog] = useState(false)
const [selectedProduct, setSelectedProduct] = useState(null)

    

      const isMobile = useMobile()
      const {data, loading, deleteProduct} = useContext(Catalog)
  
  const handleEdit = (product) => {
    setOpenEditDialog(true)
    setSelectedProduct(product)
  }

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
    <>
    {
      openEditDialog && <AddProductDialog product={selectedProduct} onClose={()=>setOpenEditDialog(false)}/>
    }
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
                <ProductCard product={product} key={index} handleDelete={deleteProduct} handleEdit={()=>handleEdit(product)}/>
            ))
        }
    </div>
    </>
  )
}

export default Splash