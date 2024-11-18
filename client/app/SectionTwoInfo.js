import * as m from "framer-motion/m"
import { lazyMotion, domAnimation } from 'framer-motion'

const SectionTwoInfo = ({ children }) => {

  return (
    <lazyMotion features={domAnimation}>

    <m.div
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
    </m.div>
    </lazyMotion>
  )
}

export default SectionTwoInfo