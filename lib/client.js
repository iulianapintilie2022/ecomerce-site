import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';


export const client = sanityClient({
    projectId: 'i91r8mmm',
    dataset: 'production',
    apiVersion: '2023-01-09',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
  });
  
  const builder = imageUrlBuilder(client);
  
  export const urlFor = (source) => builder.image(source).url();