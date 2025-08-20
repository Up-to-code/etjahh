import  { PropertyCardDemo } from '@/components/Home/a'
import HorizontalPropertyCard from '@/components/Home/a1'
import Hero from '@/components/Home/hero/Hero'
import TextDisplay from '@/components/Home/HorizontalPropertyCard'
import RealEstateTrends from '@/components/Home/RealEstateTrends'
import { Button } from '@/components/ui/button'
import React from 'react'

function page() {
  return (
    <>
       <Hero />
       <PropertyCardDemo/>
       <HorizontalPropertyCard/>
       <RealEstateTrends/>
       <TextDisplay/>
    </>
  )
}

export default page
