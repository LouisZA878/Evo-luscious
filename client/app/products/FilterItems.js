"use client"

import { useState } from 'react'

import useFilter from '@/Store/useFilter'

const FilterItems = () => {
const { setGender, setAge, setSize } = useFilter()

const [genderHighlight, setGenderHighlight] = useState(0)
const [ageHighlight, setAgeHighlight] = useState(0)
const [sizeHighlight, setSizeHighlight] = useState(0)

const handleAge = (amount, Age) => {
  setAgeHighlight(amount)
  setAge(Age)

}
const handleGender = (amount, Gender) => {
  setGenderHighlight(amount)
  setGender(Gender)

}
const handleSize = (amount, Size) => {
  setSizeHighlight(amount)
  setSize(Size)

}

  return (
    <>
      <section
        style={{ '--left': ageHighlight + 'px' }}
      >
        <span onClick={() => handleAge(0, "Toddler")}>Toddler</span>
        <span onClick={() => handleAge(100, "Teenager")}>Teenager</span>
        <span onClick={() => handleAge(200, "Adult")}>Adult</span>

      </section>
      <section
        style={{ '--left': sizeHighlight + 'px' }}
      >
        <span onClick={() => handleSize(0, "SM")}>SM</span>
        <span onClick={() => handleSize(100, "MD")}>MD</span>
        <span onClick={() => handleSize(200, "LG")}>LG</span>

      </section>
      <section
        style={{ '--left': genderHighlight + 'px' }}
      >
        <span onClick={() => handleGender(0, "M")}>Man</span>
        <span onClick={() => handleGender(100, "F")}>Woman</span>

      </section>

    </>
  )
}

export default FilterItems