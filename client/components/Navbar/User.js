"use client"


import { useState } from 'react'

import UserLinks from "./UserLinks"
import UserOptions from "./UserOptions";
import UserDropdown from './UserDropdown';
import SearchOptions from './searchOptions';

const User = () => {
  const [userOptions, setUserOptions] = useState(false)
  const [searchOptions, setSearchOptions] = useState(false)


  return (
    <div className='user'>
      <UserLinks
        setUserOptions={(e) => setUserOptions(e)}
        setSearchOptions={(e) => setSearchOptions(e)}
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

    </div>
  )
}

export default User