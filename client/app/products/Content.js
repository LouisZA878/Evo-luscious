"use client"

import { useInfiniteQuery  } from "@tanstack/react-query"
import { useInView } from "framer-motion"
import { useEffect, useRef } from 'react'

import useFilter from "@/Store/useFilter"
import useSearch from "@/Store/useSearch"
import Loading from "@/components/Loading/Loading"
import Items from "./Items"


const Content = ({ products_url }) => {
  const ref = useRef(null)
  const isInView = useInView(ref)

  const { gender, age, size, clothingType } = useFilter()
  const { search } = useSearch()

  const fetchPage = async ({ pageParam }) => {
    return await fetch(
      `${products_url}/all_products?page=${pageParam}&size=${size}&gender=${gender}&age=${age}&clothingType=${clothingType}`
    ).then(res => res.json())
  }

  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [ "products", gender, age, size, clothingType ],
    queryFn: fetchPage,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      if (allPages.length < allPages[ allPages.length - 1].productsAmount) {
          return allPages.length + 1
      } else {
          return undefined
      }
  }
  });

  useEffect(() => {
    if (isInView) {
        fetchNextPage();
    }
}, [fetchNextPage, isInView])

  if ( isLoading || !data ) {
    return <Loading name="Products"/>
  }
  return (
    <div className="content">

      {
        data.pages.map( page => {
          return page.products.filter(item => item.name.includes(search)).map( ( product, i ) => (

              product.skeleton ? <ul className="items" key={i}></ul> :
              <Items
                products_url={products_url}
                key={product._id}
                age={age}
                gender={gender}
                name={product.name}
                pictureID={product.pictureID}
                productID={product._id}
                price={product.price}
                size={size}
                stock={product.stock}
                clothingType={clothingType}

              />

          ))
      })
      }
      <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
    </div>
  )
}

export default Content