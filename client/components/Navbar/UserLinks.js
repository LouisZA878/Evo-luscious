"use client"

import { FaSearch , FaShoppingBag , FaRegUser, FaPlus } from "react-icons/fa";
import { motion } from 'framer-motion'

const UserLinks = ({ setUserOptions, setSearchOptions, setAddProduct }) => {

  return (
    <>
        <motion.span
            onClick={() => setSearchOptions(pre => !pre)}
        >
          <FaSearch className='icons' />
        </motion.span>
        <span >
          <FaShoppingBag className='icons' />
        </span>
        <motion.span
            onClick={() => setUserOptions(pre => !pre)}
        >
          <FaRegUser className='icons' />
        </motion.span>
        <motion.span
            onClick={() => setAddProduct(pre => !pre)}
        >
          <FaPlus className='icons' />
        </motion.span>



        

    </>
  )
}

export default UserLinks