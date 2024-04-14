import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import ContactForm from '../components/ContactForm';
import { mongooseConnect } from '../lib/mongoose';
import { useRouter } from 'next/router';
import CategoryModel from '../models/Category';

import { NextSeo } from 'next-seo';

const ContactPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <NextSeo
        title='Kontaktai'
        description='Kontaktai'
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
      <div className='container mx-auto mt-8'>
        {loading ? (
          <div className='flex justify-center items-center min-h-screen'>
            <Spinner />
          </div>
        ) : (
          <>
            <ContactForm />
          </>
        )}
      </div>
    </>
  );
};

export default ContactPage;

export async function getServerSideProps() {
  await mongooseConnect();

  let categories = [];

  try {
    categories = await CategoryModel.find().lean().exec();
    categories = categories.map((category) => ({
      ...category,
      _id: category._id.toString(),
      parent: category.parent ? category.parent.toString() : null,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  return {
    props: {
      categories,
    },
  };
}
