import './Home.page.css'

import dynamic from 'next/dynamic'

import SectionOne from './SectionOne'
const SectionTwo = dynamic(
  () => import('./SectionTwo'),
  {
    loading: () => <p>Loading...</p>
  }
)
const SectionThree = dynamic(
  () => import('./SectionThree'),
  {
    loading: () => <p>Loading...</p>
  }
)

export default function Home() {
  return (
    <div className='home'>

      <SectionOne>
        <span></span>
        <span></span>
      </SectionOne>
      <SectionTwo />
      <SectionThree />

    </div>
  );
}
