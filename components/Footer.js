import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';

const logoUrl = '/roto_logo2.png';

const Footer = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    linkedin: 'https://www.linkedin.com/',
    tiktok: 'https://www.tiktok.com/explore',
  });

  const handleIconClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className='footer-container py-16 mt-3 '>
      <div className='container mx-auto flex flex-col items-center justify-center'>
        <div className='flex flex-wrap w-full justify-center mb-2 text-start'>
          <div className='w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0 text-text'>
            <div className='footer-link-items text-text'>
              <h2 className='text-xl font-semibold mb-4 border-b-2 border-button custom-border'>
                Rekvizitai
              </h2>
              <div className='flex flex-col mb-2'>
                <p>UAB &quot;Vandens Talpos&quot;</p>
                <p>Gatves g. 17</p>
                <p>LT-47123</p>
                <p>Kaunas</p>
                <p>Tel.: +370 12345678</p>
              </div>
            </div>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0 '>
            <div className='footer-link-items '>
              <h2 className='text-xl font-semibold mb-4 text-text border-b-2 border-button custom-border'>
                Apie mus
              </h2>
              <div className='flex flex-col mb-2 text-text '>
                <Link href='/sub/how-it-works' className='flex items-center'>
                  <MdArrowForward />
                  <span className='ml-2 '>Apie mus</span>
                </Link>
                <Link
                  href='/sub/mobile-responsive'
                  className='flex items-center'
                >
                  <MdArrowForward />
                  <span className='ml-2'>Kontaktai</span>
                </Link>
              </div>
            </div>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0 text-text'>
            <div className='footer-link-items text-text'>
              <h2 className='text-xl font-semibold mb-4 border-b-2 border-button custom-border'>
                Partneriams
              </h2>
              <div className='flex flex-col mb-2 '>
                <Link href='/contact' className='flex items-center'>
                  <MdArrowForward />
                  <span className='ml-2'>Prisijungimas partneriams</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <div className='footer-logo mb-4'>
            <Link href='/' className='social-logo flex items-center'>
              <Image
                src={logoUrl}
                alt='logo-familia'
                width={150}
                height={30}
                layout='fixed'
              />
            </Link>
          </div>
          <div className='social-icons flex items-center space-x-4 text-text mt-8'>
            <div
              onClick={() => handleIconClick(socialLinks.facebook)}
              role='button'
              className='cursor-pointer'
            >
              <FaFacebook size={24} className='text-button' />
            </div>
            <div
              onClick={() => handleIconClick(socialLinks.instagram)}
              role='button'
              className='cursor-pointer'
            >
              <FaInstagram size={24} className='text-button' />
            </div>
            <div
              onClick={() => handleIconClick(socialLinks.linkedin)}
              role='button'
              className='cursor-pointer'
            >
              <FaLinkedin size={24} className='text-button' />
            </div>
            <div
              onClick={() => handleIconClick(socialLinks.tiktok)}
              role='button'
              className='cursor-pointer'
            >
              <FaTiktok size={24} className='text-button' />
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <small className='website-rights text-gray-700'>
            Created by LB Websites &copy; 2024
          </small>
        </div>
      </div>
    </div>
  );
};

export default Footer;
