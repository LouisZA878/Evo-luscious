"use client"

import { useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'

import UpOneMAF from './UpOneMAF'
import UpOneWAF from './UpOneWAF'
import UpTwoWW from './UpTwoWW'
import Article from "./Article";

import { W_W, W_AF, M_AF } from './Images'

const SectionOne = ({ children }) => {
    const imgContainer = useRef(null)

    const absoluteTopOne = 50
    const absoluteTopTwo = 300
    const repositionValue = 150

    const { scrollYProgress } = useScroll({
        target: imgContainer,
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
    <section
        ref={imgContainer}
    >
    {children}
    <Article
        refObj={imgContainer}
    >
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    </Article>
    <UpOneMAF upOne={upOne}>
        <M_AF />
    </UpOneMAF>
    <UpOneWAF upOne={upOne}>
        <W_AF />
    </UpOneWAF>
    <UpTwoWW upTwo={upTwo}>
        <W_W />
    </UpTwoWW>

    </section>
  )
}

export default SectionOne