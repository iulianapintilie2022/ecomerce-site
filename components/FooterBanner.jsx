import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const FooterBanner = ({footerBanner: {discount, largeText1, largeText2,
saleTime, smallText, midText, product, buttonText, image}}) => {
  return (
    <div className='footer-banner-container'>
       
     <div className='banner-desc' >
      <div className='left'>
      <p>{smallText}</p>
        <h3>{midText}</h3>
        <h3>{largeText1}</h3>
        <p>{discount}</p> 
        <p>{saleTime}</p>
        <Link href={'/product/${product}'}>
          <button type='button'>{buttonText}</button>
        </Link>
      
      </div>
      <div className='right'>
      <img src={urlFor(image)} className='footer-banner-image'/>
     
      </div>
     </div>
      </div>
  )
}

export default FooterBanner