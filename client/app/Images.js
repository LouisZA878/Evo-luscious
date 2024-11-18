import Image from "next/image";

import Maf from '@/public/m-af.webp'
import Waf from '@/public/w-af.webp'
import Ww from '@/public/w-w.webp'

const W_W = () => {

  const width = 275
  const height = 225


  return <Image
      src={Ww}
      alt='Heya'
      placeholder='blur'
      width={width}
      height={height - 25}
      priority
      loading="eager"
    />
}
const W_AF = () => {
  const width = 275
  const height = 225

  return <Image
    src={Waf}
    alt='Heya'
    placeholder='blur'         
    width={width}
    height={height + 175}
    priority
    loading="eager"
  />
}
const M_AF = () => {
  const width = 275
  const height = 225

  return <Image
      src={Maf}
      alt='Heya'
      placeholder='blur'
      width={width}
      height={height}
      priority
      loading="eager"
    />
}

export {
  W_W,
  W_AF,
  M_AF
}