import React from 'react';
import { GiVillage } from 'react-icons/gi';
import { IoRestaurant } from 'react-icons/io5';
import { BiSolidHomeHeart } from 'react-icons/bi';
import { BsCloudRainFill, BsCarFrontFill } from 'react-icons/bs';

const ServicesCards = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 '>
      <Card
        title='Kaimo turizmo sodyboms'
        icon={<GiVillage className='text-7xl mb-2 text-button ' />}
      />
      <Card
        title='Maisto gamybos įmonėms'
        icon={<IoRestaurant className='text-7xl mb-2 text-button' />}
      />
      <Card
        title='Nuosaviems namams'
        icon={<BiSolidHomeHeart className='text-7xl mb-2 text-button' />}
      />
      <Card
        title='Lietaus vandens naudojimas'
        icon={<BsCloudRainFill className='text-7xl mb-2 text-button' />}
      />
      <Card
        title='Degalinėms, autoplovykloms'
        icon={<BsCarFrontFill className='text-7xl mb-2 text-button' />}
      />
    </div>
  );
};

const Card = ({ title, icon }) => {
  return (
    <div className='bg-white  rounded-2xl p-6 w-200 h-200 flex flex-col items-center justify-center shadow-2xl'>
      {icon}

      <button className='h-20 mt-11 bg-button text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors'>
        {title}
      </button>
    </div>
  );
};

export default ServicesCards;
