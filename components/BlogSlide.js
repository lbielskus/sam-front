import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

const BlogSlide = ({ posts }) => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPostIndex((prevIndex) =>
        prevIndex === posts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [posts.length]);

  const truncateContent = (content, length) => {
    return content.length > length
      ? content.substring(0, length) + '...'
      : content;
  };

  const redirectToPost = (postId) => {
    window.location.href = `/blog/${postId}`;
  };

  return (
    <section className='text-gray-600 body-font w-full '>
      <div className='container px-5 py-4 mx-auto '>
        <div className='flex flex-wrap -m-4 '>
          <div className='p-4 md:w-full '>
            <div className='h-full  rounded-xl  bg-gradient-to-r from-indigo-50 to-red-50 overflow-hidden shadow-2xl'>
              <div className='p-6'>
                <h1 className='title-font text-lg font-medium text-gray-600 mb-3'>
                  {posts[currentPostIndex].title}
                </h1>
                <p className='leading-relaxed mb-3'>
                  {truncateContent(posts[currentPostIndex].content, 400)}
                </p>
                <div className='flex items-center flex-wrap'>
                  <button className='h-[40px] text-white bg-button dark:bg-button border-2 border-button hover:border-2 hover:bg-white hover:text-button drop-shadow-md  px-4 py-1 rounded-lg'>
                    <Link href={`/blog/${posts[currentPostIndex]._id}`}>
                      Skaityti plačiau
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSlide;
