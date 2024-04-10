import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { IoIosLeaf } from 'react-icons/io';

import { BiHomeHeart } from 'react-icons/bi';
import { TbKayak } from 'react-icons/tb';
import { IoWaterSharp } from 'react-icons/io5';

const TopBanner = () => {
  return (
    <div className='flex justify-between items-center bg-gray-100 p-4'>
      <Link href='/' passHref>
        <Image
          src='/roto_logo2.png'
          alt='Logo'
          className='h-[70px] w-auto cursor-pointer'
          width={150}
          height={70}
          layout='fixed'
        />
      </Link>

      <div className='flex items-center space-x-[80px]  mr-[42px]'>
        <Link href='/categories/66112f57fd2510974d5ec388'>
          <span className='text-gray-700 cursor-pointer text-lg'>
            <IoWaterSharp className='inline-block mr-1 text-gray-700' />
            Vandens Rezervuarai
          </span>
        </Link>
        <span className='text-gray-700 opacity-50'> | </span>
        <Link href='/categories/66112f95fd2510974d5ec38e'>
          <span className='text-gray-700 cursor-pointer text-lg'>
            <IoIosLeaf className='inline-block mr-1 text-gray-700' />
            Agrikultūra
          </span>
        </Link>
        <span className='text-gray-700 opacity-50'> | </span>
        <Link href='/categories/66117d076eb4dd94149286bd'>
          <span className='text-gray-700 cursor-pointer text-lg'>
            <BiHomeHeart className='inline-block mr-1 text-gray-700' />
            Kiemas, Sodas
          </span>
        </Link>
        <span className='text-gray-700 opacity-50'> | </span>
        <Link href='/categories/66117e476eb4dd94149286d9'>
          <span className='text-gray-700 cursor-pointer text-lg'>
            <TbKayak className='inline-block mr-1 text-gray-700' />
            Pramogos, Sportas
          </span>
        </Link>
      </div>
    </div>
  );
};

export default TopBanner;
