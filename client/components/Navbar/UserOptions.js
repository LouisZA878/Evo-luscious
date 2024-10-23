import * as motion from "framer-motion/client"

const item = {
    variants: {
      closed: { x: -16, opacity: 0 },
      open: { x: 0, opacity: 1 },
    },
    transition: { opacity: { duration: 0.2 } },
  };

const UserOptions = () => {
  return (
    <>
            <motion.button
                initial='closed'
                exit='closed'
                animate='open'
                transition={item.transition}
                variants={item.variants}
            >
                Log Out
            </motion.button>
            <motion.button
                initial='closed'
                exit='closed'
                animate='open'
                transition={item.transition}
                variants={item.variants}
            >
                Settings
            </motion.button>
            <motion.button
                initial='closed'
                exit='closed'
                animate='open'
                transition={item.transition}
                variants={item.variants}
            >
                Add Product
            </motion.button>
            <motion.button
                initial='closed'
                exit='closed'
                animate='open'
                transition={item.transition}
                variants={item.variants}
            >
                Profile
            </motion.button>
    </>
  )
}

export default UserOptions