import { motion } from "framer-motion"

const UpTwoWW = ({ children, upTwo }) => {
  return (
    <motion.div
      className="img-home three"
      style={{ top: upTwo }}  
    >
        {children}
    </motion.div>
  )
}

export default UpTwoWW