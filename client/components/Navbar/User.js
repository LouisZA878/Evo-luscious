import { FaSearch , FaShoppingBag , FaRegUser } from "react-icons/fa";

const User = () => {
  return (
    <div className='user'>
        <span >
          <FaSearch className='icons' />
        </span>
        <span >
          <FaShoppingBag className='icons' />
        </span>
        <span >
          <FaRegUser className='icons' />
        </span>
    </div>
  )
}

export default User