"use client"

import { FaSearch , FaShoppingBag , FaRegUser } from "react-icons/fa";
import { motion } from 'framer-motion'

const UserLinks = ({ setUserOptions, setSearchOptions }) => {

  return (
    <>
        <motion.span
            onMouseEnter={() => setSearchOptions(true)}
            onMouseLeave={() => setSearchOptions(false)}
        >
          <FaSearch className='icons' />
        </motion.span>
        <span >
          <FaShoppingBag className='icons' />
        </span>
        <motion.span
            onMouseEnter={() => setUserOptions(true)}
            onMouseLeave={() => setUserOptions(false)}
        >
          <FaRegUser className='icons' />
        </motion.span>



        

    </>
  )
}

export default UserLinks