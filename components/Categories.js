import React from 'react';
import Link from 'next/link';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsCircleFill,
} from 'react-icons/bs';
import Image from 'next/image';

const Categories = ({ categories }) => {
  return (
    <section className='mx-auto px-4 sm:px-6 lg:px-4 py-12 bg-white rounded-2xl shadow-2xl'>
      <h2 className='text-2xl tracking-tight text-text text-center my-5'>
        Kategorijos
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 '>
        {categories.map((category, index) => (
          <div key={`${category._id}-${index}`} className='relative'>
            <div className='max-w-[26rem] flex flex-col rounded-xl bg-gradient-to-r from-indigo-50 to-red-50 bg-clip-border text-gray-700 shadow-lg '>
              <div className='relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 max-h-[250px] min-h-[250px] '>
                {category.images && category.images.length > 0 ? (
                  <Image
                    src={category.images[0]}
                    alt={category.name}
                    className='object-cover h-full w-full'
                    width={300}
                    height={250}
                    layout='responsive'
                  />
                ) : (
                  <Image
                    src='/placeholder.jpg'
                    alt='Placeholder'
                    className='object-cover h-[250px] w-full'
                    width={300}
                    height={250}
                    layout='responsive'
                  />
                )}
                <div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60'></div>
              </div>
              <div className='p-6 flex flex-col justify-center'>
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
    </section>
  );
};

export default Categories;
