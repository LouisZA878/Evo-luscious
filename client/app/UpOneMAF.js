import { motion } from "framer-motion"

const UpOneMAF = ({ children, upOne }) => {
  return (
    <motion.div
      className="img-home one"
      style={{ top: upOne }}
    >
      {children}
    </motion.div>
  )
}

export default UpOneMAF