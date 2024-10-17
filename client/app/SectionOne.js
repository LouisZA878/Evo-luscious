"use client"

import { useRef } from 'react'

import Article from "./Article";
import Images from "./Images";

const SectionOne = ({ children }) => {
    const imgContainer = useRef(null)

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
    <Images
        refObj={imgContainer}
    />

    </section>
  )
}

export default SectionOne