import { GiPoloShirt, GiSunglasses, GiTravelDress } from "react-icons/gi";
import { PiPantsFill } from "react-icons/pi";

const Links = () => {
    const links = [
        {
            icon: <GiTravelDress />,
            name: "Bundle",
        },
        {
            icon: <GiPoloShirt />,
            name: "Shirts",
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
             <div key={item.name}>
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