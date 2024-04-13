import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { IoIosLeaf } from 'react-icons/io';

import { BiHomeHeart } from 'react-icons/bi';
import { TbKayak } from 'react-icons/tb';
import { IoWaterSharp } from 'react-icons/io5';

import styles from '../styles/topbanner.module.css';

const TopBanner = () => {
  return (
    <div
      className={`${styles['logo']} flex justify-between items-center bg-gray-100 p-4`}
    >
      <Link href='/' passHref>
        <Image
          src='/rotoLogo210.png'
          alt='Logo'
          className='h-[90px] w-auto cursor-pointer'
          width={210}
          height={105}
          layout='fixed'
        />
      </Link>

      <div
        className={`${styles['hide-links']} flex items-center mr-[42px] space-x-[0px] sm:space-x-[10px] md:space-x-[30px] xl:space-x-[70px] 2xl:space-x-[80px]`}
      >
        <Link href='/categories/66191852162b18cfa20227c3'>
          <span className='text-gray-700 cursor-pointer text-lg'>
            <IoWaterSharp className='inline-block mr-1 text-gray-700' />
            Vanduo
          </span>
        </Link>
        <span className='text-gray-700 opacity-50'> | </span>
        <Link href='/categories/6619190e162b18cfa20227c9'>
          <span className='text-gray-700 cursor-pointer text-lg'>
            <IoIosLeaf className='inline-block mr-1 text-gray-700' />
            Agrikultūra
          </span>
        </Link>
        <span className='text-gray-700 opacity-50'> | </span>
        <Link href='/categories/6619193b162b18cfa20227cd'>
          <span className='text-gray-700 cursor-pointer text-lg'>
            <BiHomeHeart className='inline-block mr-1 text-gray-700' />
            Namai, Sodas
          </span>
        </Link>
        <span className='text-gray-700 opacity-50'> | </span>
        <Link href='/categories/6619196a162b18cfa20227d1'>
          <span className='text-gray-700 cursor-pointer text-lg'>
            <TbKayak className='inline-block mr-1 text-gray-700' />
            Pramogos
          </span>
        </Link>
      </div>
    </div>
  );
};

export default TopBanner;
