import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { mongooseConnect } from '../../lib/mongoose';
import { Blog as BlogComponent } from '../../models/Blog';
import styles from '../../styles/buttonStyles2.module.scss';

export default function Blog({ posts }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handlePostClick = (postId) => {
    router.push(`/blog/${postId}`);
  };

  const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + '...';
    } else {
      return content;
    }
  };

  return (
    <div className='mx-auto px-4 py-8 '>
      <h1 className='text-2xl text-center  text-gray-800 mb-6 '>Straipsniai</h1>
      <div className='grid grid-cols-1 gap-4 '>
        {loading ? (
          <p>Loading...</p>
        ) : posts.length === 0 ? (
          <p>No blog posts available.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className='border p-4 rounded-xl shadow-md bg-gray-200'
            >
              <h2 className='text-xl font-semibold text-gray-800'>
                {post.title}
              </h2>
              <p className='text-gray-600 mb-2'>
                Paskelbimo data: {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className='text-gray-800'>
                {truncateContent(post.content, 500)}
              </p>
              <div className='mt-4 flex justify-end '>
                <button
                  onClick={() => handlePostClick(post._id)}
                  type='button'
                  className={` relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-white hover:text-border rounded-2xl group bg-gradient-to-br from-third to-primary group-hover:from-third group-hover:to-primary hover:text-text2 dark:text-text2`}
                >
                  <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-button dark:bg-button rounded-2xl border-2 border-button hover:border-2 hover:bg-white hover:text-button'>
                    Skaityti plačiau
                  </span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const posts = await BlogComponent.find().sort({ createdAt: -1 });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}
