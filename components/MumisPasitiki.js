import React from 'react';
import Image from 'next/image';

const MumisPasitiki = () => {
  return (
    <section className='py-10 bg-gradient-to-r from-indigo-50 to-red-75 rounded-2xl  shadow-2xl'>
      <div className='container mx-auto'>
        <h2 className='text-xl text-center font-semibold text-gray-700 mb-8 opacity-90'>
          MUMIS PASITIKI:
        </h2>
        <div className='flex justify-center items-center space-x-80'>
          <Image
            src='/roto_attivo_logo.png'
            alt='Logo 1'
            width={190}
            height={70}
            className='h-16 opacity-80'
            layout='fixed'
          />
          <Image
            src='/delsyk-logo.png'
            alt='Logo 2'
            width={180}
            height={70}
            className='h-16 opacity-80'
            layout='fixed'
          />
        </div>
      </div>
    </section>
  );
};

export default MumisPasitiki;
