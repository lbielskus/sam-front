import Link from 'next/link';

import { NextSeo } from 'next-seo';

export default function ErrorPage() {
  return (
    <>
      <NextSeo
        title='Puslapis nerastas'
        description='Puslapis nerastas'
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://yourwebsite.com/',
          site_name: 'Vandens Talpos',
          images: [
            {
              url: 'https://res.cloudinary.com/dtv9ufmel/image/upload/v1712755967/ecommerce-app/nkdyueoqvtwbc215unry.png',
              width: 1200,
              height: 630,
              alt: 'Roto image',
            },
          ],
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <div className='grid h-screen px-4 bg-white place-content-center'>
        <div className='text-center'>
          <h1 className='font-black text-gray-100 text-9xl'>404</h1>

          <p className='text-2xl font-bold tracking-tight text-gray-700 sm:text-4xl'>
            Ups...
          </p>

          <p className='mt-4 text-gray-500'>Šis puslapis neegzistuoja.</p>

          <Link
            href='/'
            className='inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-primary rounded hover:bg-primary focus:outline-none focus:ring'
          >
            Grįžti į pagrindinį
          </Link>
        </div>
      </div>
    </>
  );
}
