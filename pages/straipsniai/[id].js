import { useEffect, useState } from 'react';
import axios from 'axios';
import { mongooseConnect } from '../../lib/mongoose';
import { Blog } from '../../models/Blog';
import CategoryModel from '../../models/Category';

import { NextSeo } from 'next-seo';

export default function BlogPost({ post }) {
  if (!post) {
    return <p>Post not found.</p>;
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  return (
    <>
      <NextSeo
        title={`${post.title}`}
        description={`${post.title} - ${post.description}`}
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
      <div className='mx-auto px-4 py-8 bg-gray-100 bg-opacity-70 rounded shadow-xl'>
        <h1 className='text-3xl font-bold text-gray-600 mb-6'>{post.title}</h1>
        <p className='text-gray-600 mb-2'>Paskelbimo data: {formattedDate}</p>
        <div className='overflow-x-auto'>
          <pre
            className='text-gray-700 whitespace-pre-wrap'
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '16px',
              lineHeight: '1.5',
            }}
          >
            {post.content}
          </pre>
        </div>
      </div>
    </>
  );
}

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
