import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/slidingcategories.module.css';

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsCircleFill,
} from 'react-icons/bs';

const SlidingCategories = ({ categories }) => {
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (categories && categories.length > 0) {
      const endIndex = (startIndex + 3) % categories.length;
      if (endIndex >= startIndex) {
        setVisibleCategories(categories.slice(startIndex, endIndex));
      } else {
        setVisibleCategories([
          ...categories.slice(startIndex),
          ...categories.slice(0, endIndex),
        ]);
      }
    }

    if (window.innerWidth > 768) {
      const interval = setInterval(() => {
        setStartIndex((prevIndex) => (prevIndex + 1) % categories.length);
      }, 4500);

      return () => clearInterval(interval);
    }
  }, [categories, startIndex]);

  const handlePrevClick = () => {
    setStartIndex(
      (prevIndex) => (prevIndex - 3 + categories.length) % categories.length
    );
  };

  const handleNextClick = () => {
    setStartIndex((prevIndex) => (prevIndex + 3) % categories.length);
  };

  return (
    <section className=' mx-auto px-4 sm:px-6 lg:px-4 py-12 bg-gradient-to-r from-indigo-50 to-red-50 rounded-2xl shadow-2xl'>
      <h2 className='text-2xl tracking-tight text-text text-center my-5'>
        Kategorijos
      </h2>
      <div
        className={`${styles['center-categories']} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-6`}
      >
        {visibleCategories.map((category, index) => (
          <div key={`${category._id}-${index}`} className='relative'>
            <div className='w-full max-w-[26rem] min-w-[18rem] flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg h-[380px] md:h-[450px] lg:h-[450px] xl:h-[450px]'>
              <div className='relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40'>
                {category.images && category.images.length > 0 ? (
                  <Image
                    src={category.images[0]}
                    alt={category.name}
                    className='object-fill w-full'
                    width={300}
                    height={250}
                    layout='responsive'
                  />
                ) : (
                  <Image
                    src='/placeholder.jpg'
                    alt='Placeholder'
                    className='object-fill w-full'
                    width={300}
                    height={250}
                    layout='responsive'
                  />
                )}
              </div>
              <div className='p-6 flex flex-col justify-center h-[150px] lg:h-[150px]'>
                <h5 className='text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased text-center pt-[35px] pb-[35px]'>
                  {category.name}
                </h5>
                <p className='text-base font-light leading-relaxed text-gray-700 antialiased text-center'>
                  {category.description}
                </p>
                <div className='mt-auto'>
                  <Link href={`/categories/${category._id}`}>
                    <button className='w-full select-none rounded-lg bg-button py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>
                      Žiūrėti
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center mt-6'>
        <BsFillArrowLeftCircleFill
          className='cursor-pointer text-2xl mr-4 text-red-700'
          onClick={handlePrevClick}
        />
        {[...Array(Math.ceil(categories.length / 3))].map((_, i) => (
          <BsCircleFill
            key={i}
            className={`mx-1 ${
              i === Math.floor(startIndex / 3)
                ? 'text-red-200'
                : 'text-gray-300'
            }`}
            style={{ fontSize: '1.5rem' }}
          />
        ))}
        <BsFillArrowRightCircleFill
          className='cursor-pointer text-2xl ml-4 text-red-700'
          onClick={handleNextClick}
        />
      </div>
    </section>
  );
};

export default SlidingCategories;
