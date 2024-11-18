"use client"

import { LazyMotion, domAnimation } from "framer-motion"
import dynamic from 'next/dynamic'
import { useState } from 'react'

import UserLinks from "./UserLinks"

const UserOptions = dynamic(
  () => import('./UserOptions'),
  {
    loading: () => <p>Loading...</p>,
  }
)
const UserDropdown = dynamic(
  () => import('./UserDropdown'),
  {
    loading: () => <p>Loading...</p>,
  }
)
const SearchOptions = dynamic(
  () => import('./searchOptions'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
)
const AddProduct = dynamic(
  () => import('./AddProduct'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
)


const User = ({ products_url }) => {
  const [userOptions, setUserOptions] = useState(false)
  const [searchOptions, setSearchOptions] = useState(false)
  const [addProduct, setAddProduct] = useState(false)

  return (
    <div className='user'>
      <LazyMotion features={domAnimation}>
      <UserLinks
        setUserOptions={(e) => setUserOptions(e)}
        setSearchOptions={(e) => setSearchOptions(e)}
        setAddProduct={(e) => setAddProduct(e)}
      />
      <UserDropdown
        options={userOptions}
        setOptions={(e) => setUserOptions(e)}
      >
        <UserOptions />
      </UserDropdown>
      <UserDropdown
        options={searchOptions}
        setOptions={(e) => setSearchOptions(e)}
      >
        <SearchOptions />
      </UserDropdown>
      <UserDropdown
        options={addProduct}
        setOptions={(e) => setAddProduct(e)}
      >
        <AddProduct products_url={products_url}/>
      </UserDropdown>
      </LazyMotion>
    </div>
  )
}

export default User