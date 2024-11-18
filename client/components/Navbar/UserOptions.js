import * as m from "framer-motion/m"

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
            <m.button
                initial='closed'
                exit='closed'
                animate='open'
                transition={item.transition}
                variants={item.variants}
            >
                Log Out
            </m.button>
            <m.button
                initial='closed'
                exit='closed'
                animate='open'
                transition={item.transition}
                variants={item.variants}
            >
                Settings
            </m.button>
            <m.button
                initial='closed'
                exit='closed'
                animate='open'
                transition={item.transition}
                variants={item.variants}
            >
                Profile
            </m.button>
    </>
  )
}

export default UserOptions