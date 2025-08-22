import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
 
function AdImage() {
  return (
    <Link href={"/"}>
       <Image className='w-[90%] m-auto max-w-5xl' src={"/imgi_49_Christie-banner-ar.webp"} width={1800} height={100} alt='ad'/>
    </Link>
  )
}

export default AdImage
