
import { FaSearch , FaShoppingBag , FaRegUser, FaPlus } from "react-icons/fa";

const UserLinks = ({ setUserOptions, setSearchOptions, setAddProduct }) => {

  return (
    <>
        <span
            onClick={() => setSearchOptions(pre => !pre)}
        >
          <FaSearch className='icons' />
        </span>
        <span >
          <FaShoppingBag className='icons' />
        </span>
        <span
            onClick={() => setUserOptions(pre => !pre)}
        >
          <FaRegUser className='icons' />
        </span>
        <span
            onClick={() => setAddProduct(pre => !pre)}
        >
          <FaPlus className='icons' />
        </span>



        

    </>
  )
}

export default UserLinks