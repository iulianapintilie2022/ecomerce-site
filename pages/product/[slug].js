import React from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useState } from 'react';
import {useStateContext} from '../../context/StateContext'


const ProductDetails = ({ product, products }) => {
    const {image, name, details, price, item} = product;
    const [index, setIndex] = useState(0);
    const {decQty, incQty, qty, onAdd} =useStateContext();

    let imageUrl = '';
    if (image && image[0]) {
        imageUrl = urlFor(image[0]);
        console.log("URL:"+imageUrl);
    }
  return (
    <div>
        <div className='product-detail-container'>
          <div>
                <div className='image-container'>
                <img src={image && image[index] ? urlFor(image[index]) : 'https://media.istockphoto.com/id/1202689418/photo/curious-cat-face-peeps-out.jpg?s=612x612&w=0&k=20&c=O2hE2hGv0naoRJuLKGfV-SEqSqTQ9K2RpJ28cymfUrE='} className="product-detail-image"/>
                </div>
                <div className="small-images-container">
                  {image?.map((item, i)=>(
                    <div>
                    <img key={i} src={urlFor(item)}
                    className={i === index ? 'small-image selected-image':
                     'small-image'}
                    onMouseEnter={()=> setIndex(i)}
                    />
                    </div>
                  ))}
          </div>  
            </div>
          <div className='product-detail-desc'>
            <h1>{name}</h1>
            
            <div className='reviews'>
          <AiFillStar/>
          <AiFillStar/>
          <AiFillStar/>
          <AiFillStar/>
          <AiOutlineStar/>
            </div>
          <p>(20)</p>
          <h1 className='price'>€{price}</h1>
          <div className='product-details'>
          <h4>Details</h4>
          <p>{details}</p></div>
          </div>
          <div className='quantity'>
            <h3>Quantity</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}><AiOutlineMinus/></span>
              <span className='num'>{qty}</span>
              <span className='plus' onClick={incQty}><AiOutlinePlus/></span>
              </p>
              <div className='buttons'>
          <button type='button' 
          className='buy-now'
          onClick={() => onAdd(product, qty)}>Add to Cart</button>
          </div>
        </div>
        
          </div>
          <div className='maylike-products-wrapper'>
            <h2>You may also like</h2>
            <div className='marquee'>
              <div className='maylike-products-container track'>
                {products.map((item) =>(
                  <Product key={item._id} product={item}/>
                ))}
              </div>
            </div>
          </div>
    </div>
  )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
      slug {
        current
      }
    }
    `;
  
const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}
  
  export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'
    
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
  
    console.log(product);
  
    return {
      props: { product, products }
    }
  }
export default ProductDetails