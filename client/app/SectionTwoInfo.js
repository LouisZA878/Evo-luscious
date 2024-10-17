"use client"

import { motion } from 'framer-motion';

const SectionTwoInfo = ({ children }) => {

  return (
    <motion.div
    initial={{ x: '100%' }}
    animate={{ x: '-100%' }}
    transition={{ 
      duration: 10, 
      ease: 'linear', 
      repeat: Infinity,
      repeatType: 'loop',
      delay: 0
    }}
  >

    {children}
  </motion.div>
  )
}

export default SectionTwoInfo