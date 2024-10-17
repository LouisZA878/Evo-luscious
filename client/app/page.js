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
          objectPosition="center"
        />
        <Image
        src={Maf}
          height={225}
          objectPosition="center"
        />
        <Image
        src={Ww}
          height={245}

          objectPosition="center"
        />
        <Image
        src={Maf}
          height={125}
          objectPosition="center"
        />
        <Image
        src={Ww}
          height={275}
          objectPosition="center"
        />
        <Image
        src={Waf}
          height={175}
          objectPosition="center"
        />
        <Image
        src={Waf}
          height={230}
          objectPosition="center"
        />
        <Image
        src={Maf}
          height={225}
          objectPosition="center"
        />
        <Image
        src={Ww}
          height={245}
          objectPosition="center"
        />
        <Image
        src={Maf}
          height={125}
          objectPosition="center"
        />
        <Image
        src={Ww}
          height={275}
          objectPosition="center"
        />
        <Image
        src={Waf}
          height={175}
          objectPosition="center"
        />

      </section>
    </div>
  );
}
