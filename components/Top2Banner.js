import React from 'react';
import Link from 'next/link';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const Top2Banner = () => {
  return (
    <div className='flex justify-between items-center bg-gray-100 p-4 h-14 border-b border-opacity-50 border-gray-500 pr-[60px]'>
      <div className='flex items-center space-x-4'>
        <div className='flex items-center space-x-2'>
          <FaPhone className='text-gray-700' />
          <span className='text-gray-700'>+37065059050</span>
        </div>
        <div className='flex items-center space-x-2'>
          <FaEnvelope className='text-gray-700' />
          <span className='text-gray-700'>info@info.lt</span>
        </div>
      </div>

      <div className='flex items-center space-x-4'>
        <span>
          <Link href='/about-us'>
            <span className='text-gray-700 cursor-pointer'>Apie mus</span>
          </Link>
        </span>
        <span className='text-gray-700'> \ </span>
        <span>
          <Link href='/contact'>
            <span className='text-gray-700 cursor-pointer'>Kontaktai</span>
          </Link>
        </span>
        <span className='text-gray-700'> \ </span>
        <span>
          <Link href='/blog'>
            <span className='text-gray-700 cursor-pointer'>Tinklaraštis</span>
          </Link>
        </span>
        <span className='text-gray-700'> \ </span>
        <span>
          <Link href='/partners'>
            <span className='text-gray-700 cursor-pointer'>Partneriams</span>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Top2Banner;
