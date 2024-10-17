import Link from "next/link"

const Links = () => {
  return (
    <div className='links'>
        <Link href='/'>
            Home
        </Link>
        <Link href='/products'>
            Products
        </Link>
        <Link href='/about'>
            About
        </Link>
        <Link href='/contact'>
            Contact
        </Link>
    </div>
  )
}

export default Links