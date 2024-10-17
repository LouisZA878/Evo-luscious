"use client"

import Image from "next/image";
import { motion, useScroll, useTransform } from 'framer-motion'

import Maf from '@/public/m-af.jpg'
import Waf from '@/public/w-af.jpg'
import Ww from '@/public/w-w.jpg'

const Images = ({ refObj }) => {
  const width = 275
  const height = 225

  const absoluteTopOne = 50
  const absoluteTopTwo = 300
  const repositionValue = 150


  const { scrollYProgress } = useScroll({
    target: refObj,
    offset: ['start 75px', 'end start']
  })
  const upOne = useTransform(
    scrollYProgress,
    [0, 1],
    [absoluteTopOne, ( absoluteTopOne - repositionValue )]
  )
  const upTwo = useTransform(
    scrollYProgress,
    [0, 1],
    [absoluteTopTwo, ( absoluteTopTwo - repositionValue ) ]
  )

  return (
    <>

    <motion.div
      className="img-home one"
      style={{ top: upOne }}
    >
        <Image
          src={Maf}
          alt='Heya'
          placeholder='blur'
          width={width}
          height={height}
        />

    </motion.div>
    <motion.div
      className="img-home two"
      style={{ top: upOne }}
    >
        <Image
          src={Waf}
          alt='Heya'
          placeholder='blur'         
          width={width}
          height={height + 175}
        />

    </motion.div>
    <motion.div
      className="img-home three"
      style={{ top: upTwo }}  
    >
        <Image
          src={Ww}
          alt='Heya'
          placeholder='blur'
          width={width}
          height={height - 25}
        />

    </motion.div>
        
    </>
  )
}

export default Images