 import PropertyCardDemo from '@/components/Home/a1'
import HorizontalPropertyCard from '@/components/Home/a1'
import Hero from '@/components/Home/hero/Hero'
import TextDisplay from '@/components/Home/HorizontalPropertyCard'
import RealEstateTrends from '@/components/Home/RealEstateTrends'
import WhyUs from '@/components/Home/WhyUs'
import { Button } from '@/components/ui/button'
 import React from 'react'

function page() {
  return (
    <>
       <Hero />
        <PropertyCardDemo/>
        <RealEstateTrends/>
        {/* <TextDisplay/> */}
       <WhyUs/>
    </>
  )
}

export default page
