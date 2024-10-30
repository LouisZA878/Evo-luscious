"use client"

import useSearch from "@/Store/useSearch"

const searchOptions = () => {
const { searchInput } = useSearch()

  return (
    <input
      type="text"
      placeholder="&nbsp;"
      onChange={e => searchInput(e.target.value)}  
    />
  )
}

export default searchOptions