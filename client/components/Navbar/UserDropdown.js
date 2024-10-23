import { motion, AnimatePresence } from 'framer-motion'

const UserDropdown = ({ options, setOptions, children }) => {
    const menu = {
        closed: {
          scale: 0,
          transition: {
            delay: 0.15,
          },
        },
        open: {
          scale: 1,
          transition: {
            type: "spring",
            duration: 0.4,
            delayChildren: 0.2,
            staggerChildren: 0.05
          },
        },
    };

  return (
    <AnimatePresence>
    {options && (
    <motion.div
        onMouseEnter={() => setOptions(true)}
        onMouseLeave={() => setOptions(false)}
        initial="closed"
        exit="closed"
        animate="open"
        variants={menu}
    >
        {children}
    </motion.div>
    )}
    </AnimatePresence>
  )
}

export default UserDropdown