
import Filter from "./Filter"
import Sidebar from "./Sidebar"
import Links from "./Links"
import Content from "./Content"

const page = () => {

  const { PRODUCTS_PORT, PRODUCTS_HOST, PRODUCTS_PROTOCALL } = process.env 

  const products_url = `${PRODUCTS_PROTOCALL}://${PRODUCTS_HOST}:${PRODUCTS_PORT}/api/products/v1` 
  return (
    <div className="products">
      <Filter />
      <Sidebar>
        <Links />
      </Sidebar>
      <Content products_url={products_url} />


    </div>
  )
}

export default page