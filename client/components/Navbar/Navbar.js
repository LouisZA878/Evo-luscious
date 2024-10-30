import Title from "./Title"
import Links from "./Links"
import User from "./User"


const Navbar = () => {

  const { PRODUCTS_PORT, PRODUCTS_HOST, PRODUCTS_PROTOCALL } = process.env 

  const products_url = `${PRODUCTS_PROTOCALL}://${PRODUCTS_HOST}:${PRODUCTS_PORT}/api/products/v1` 


  return (
    <nav>
        <Title />
        <Links />
        <User products_url={products_url} />
    
    </nav>
  )
}

export default Navbar