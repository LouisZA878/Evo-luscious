import { motion } from "framer-motion"

const UpOneWAF = ({ children, upOne }) => {
  return (
    <motion.div
      className="img-home two"
      style={{ top: upOne }}
    >
        {children}
    </motion.div>
  )
}

export default UpOneWAF