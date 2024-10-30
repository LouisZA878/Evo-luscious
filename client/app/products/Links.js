"use client"

import { GiPoloShirt, GiSunglasses, GiTravelDress } from "react-icons/gi";
import { PiPantsFill } from "react-icons/pi";

import useFilter from '@/Store/useFilter'

const Links = () => {
  const { clothingType, setClothingType } = useFilter()

    const links = [
        {
            icon: <GiTravelDress />,
            name: "Bundle",
        },
        {
            icon: <GiPoloShirt />,
            name: "Shirt",
        },
        {
            icon: <PiPantsFill />,
            name: "Pants",
        },
        {
            icon: <GiSunglasses />,
            name: "Accesories",
        },
    ]


  return (
    <section>
        {
            links.map( item => (
             <div key={item.name} onClick={() => setClothingType(item.name)}>
                <span>
                  {item.icon}
                </span>
                <span>
                  {item.name}
                </span>
              </div>
            ))
        }
    </section>
  )
}

export default Links