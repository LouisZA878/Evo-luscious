"use client"


import { useState } from 'react'

import UserLinks from "./UserLinks"
import UserOptions from "./UserOptions";
import UserDropdown from './UserDropdown';
import SearchOptions from './searchOptions';
import AddProduct from './AddProduct';

const User = () => {
  const [userOptions, setUserOptions] = useState(false)
  const [searchOptions, setSearchOptions] = useState(false)
  const [addProduct, setAddProduct] = useState(false)



  
  return (
    <div className='user'>
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
        <AddProduct />
      </UserDropdown>

    </div>
  )
}

export default User