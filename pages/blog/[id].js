import { useEffect, useState } from 'react';
import axios from 'axios';
import { mongooseConnect } from '../../lib/mongoose';
import { Blog } from '../../models/Blog';

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
    <div className='mx-auto px-4 py-8 bg-gray-200 bg-opacity-70 rounded shadow-xl'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6'>{post.title}</h1>
      <p className='text-gray-600 mb-2'>Published on {formattedDate}</p>
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
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const post = await Blog.findById(id);
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
}
