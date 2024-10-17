"use client"

import { motion, useScroll, useTransform } from 'framer-motion'

const Article = ({ children, refObj }) => {

    const { scrollYProgress } = useScroll({
        target: refObj,
        offset: ['start 75px', 'end start']
    })
    const upOne = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -200]
      )
    const downOne = useTransform(
        scrollYProgress,
        [0, 1],
        [0, 200 ]
      )

  return (
    <article>
    <motion.h1
        style={{ y: upOne }}
    >
      Express yourself with <span>Evo-Luscious.</span>
    </motion.h1>
    <motion.p
        style={{ y: downOne }}
    >
        {children}
    </motion.p>
  </article>
  )
}

export default Article