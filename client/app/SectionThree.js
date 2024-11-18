import Image from "next/image";

import Maf from '@/public/m-af.webp'
import Waf from '@/public/w-af.webp'
import Ww from '@/public/w-w.webp'

const SectionThree = () => {
  return (
    <section>
    <Image
    src={Waf}
      height={230}
      alt="image"

    />
    <Image
    src={Maf}
      height={225}
      alt="image"

    />
    <Image
    src={Ww}
      height={245}
      alt="image"

    />
    <Image
    src={Maf}
      height={125}
      alt="image"

    />
    <Image
    src={Ww}
      height={275}
      alt="image"
      priority

    />
    <Image
    src={Waf}
      height={175}
      alt="image"

    />
    <Image
    src={Waf}
      height={230}
      alt="image"

    />
    <Image
    src={Maf}
      height={225}
      alt="image"

    />
    <Image
    src={Ww}
      height={245}
      alt="image"

    />
    <Image
    src={Maf}
      height={125}
      alt="image"

    />
    <Image
    src={Ww}
      height={275}
      alt="image"

    />
    <Image
    src={Waf}
      height={175}
      alt="image"
    />

    </section>
  )
}

export default SectionThree