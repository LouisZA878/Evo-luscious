import Image from "next/image";

import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";

import Maf from '@/public/m-af.jpg'
import Waf from '@/public/w-af.jpg'
import Ww from '@/public/w-w.jpg'

export default function Home() {
  return (
    <div className='home'>

      <SectionOne>
        <span></span>
        <span></span>
      </SectionOne>
      <SectionTwo />
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
    </div>
  );
}
