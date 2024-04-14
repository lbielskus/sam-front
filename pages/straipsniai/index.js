import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { mongooseConnect } from '../../lib/mongoose';
import { Blog as BlogComponent } from '../../models/Blog';
import styles from '../../styles/buttonStyles2.module.scss';

import CategoryModel from '../../models/Category';
import { NextSeo } from 'next-seo';

export default function Blog({ posts }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handlePostClick = (postId) => {
    router.push(`/straipsniai/${postId}`);
  };

  const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + '...';
    } else {
      return content;
    }
  };

  return (
    <>
      <NextSeo
        title='Straipsniai'
        description='Straipsniai'
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
      <div className='mx-auto px-4 py-8 '>
        <h1 className='text-2xl text-center  text-gray-700 mb-6 '>
          Straipsniai
        </h1>
        <div className='grid grid-cols-1 gap-4 '>
          {loading ? (
            <p>Loading...</p>
          ) : posts.length === 0 ? (
            <p>Straipsnių nėra.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                className='border p-4 rounded-xl shadow-md bg-gray-150'
              >
                <h2 className='text-xl font-semibold text-gray-800'>
                  {post.title}
                </h2>
                <p className='text-gray-600 mb-2'>
                  Paskelbimo data:{' '}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className='text-gray-800'>
                  {truncateContent(post.content, 500)}
                </p>
                <div className='mt-4 flex justify-end '>
                  <button
                    onClick={() => handlePostClick(post._id)}
                    type='button'
                    className={` relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-white hover:text-border rounded-xl group bg-gradient-to-br from-third to-primary group-hover:from-third group-hover:to-primary hover:text-text2 dark:text-text2`}
                  >
                    <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-button dark:bg-button rounded-xl border-2 border-button hover:border-2 hover:bg-white hover:text-button'>
                      Skaityti plačiau
                    </span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  let posts = [];
  let categories = [];

  try {
    posts = await BlogComponent.find().sort({ createdAt: -1 });

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
      posts: JSON.parse(JSON.stringify(posts)),
      categories,
    },
  };
}
