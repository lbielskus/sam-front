import React from 'react';
import Layout from '../../components/Layout';

import { mongooseConnect } from '../../lib/mongoose';
import { useRouter } from 'next/router';
import CategoryModel from '../../models/Category';

import { NextSeo } from 'next-seo';

const ApieMus = () => {
  return (
    <>
      <NextSeo
        title='Apie mus'
        description='Apie mus'
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
      <Layout>
        <div className='container mx-auto px-4 py-8 text-center'>
          <h1 className='text-3xl font-semibold mb-4'>Apie mus</h1>
          <p className='text-lg mb-4'>Apie mus</p>
        </div>
      </Layout>
    </>
  );
};

export default ApieMus;

export async function getServerSideProps(context) {
  await mongooseConnect();

  let categories = [];
  let post = null;

  try {
    const { id } = context.query;
    if (id) {
      post = await Blog.findById(id);
    }

    categories = await CategoryModel.find().lean().exec();
    categories = categories.map((category) => ({
      ...category,
      _id: category._id.toString(),
      parent: category.parent ? category.parent.toString() : null,
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return {
    props: {
      post: post ? JSON.parse(JSON.stringify(post)) : null,
      categories,
    },
  };
}
