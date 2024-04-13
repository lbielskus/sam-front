import Link from 'next/link';
import { useContext, useState } from 'react';
import { CartContext } from '../lib/CartContext';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from '../styles/products.module.css';

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function Products({ products }) {
  const { addProduct } = useContext(CartContext);
  const [currentImageIndexes, setCurrentImageIndexes] = useState(
    Array(products.length).fill(0)
  );
  const router = useRouter();

  const handleNextImage = (index) => {
    setCurrentImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[index] =
        (newIndexes[index] + 1) % products[index].images.length;
      return newIndexes;
    });
  };

  const handlePreviousImage = (index) => {
    setCurrentImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[index] =
        newIndexes[index] === 0
          ? products[index].images.length - 1
          : newIndexes[index] - 1;
      return newIndexes;
    });
  };

  const redirectToPost = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className='bg-gradient-to-r from-indigo-50 to-red-50 rounded-2xl shadow-2xl'>
      <div className='content-center py-10 max-w-screen-2xl'>
        <h2 className='text-2xl tracking-tight text-text text-center my-1'>
          Naujausios prekės
        </h2>

        <div
          className={`mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-3 xl:gap-x-8  ${styles['center-products']}`}
        >
          {products?.length > 0 &&
            products.map((product, index) => (
              <div
                key={product._id}
                className='group relative w-full sm:w-1/2 lg:w-1/2 xl:w-1/2'
              >
                <div className='xl:ml-[55px] 2xl:ml-[70px] mx-auto mt-11 w-80 transform overflow-hidden rounded-2xl bg-white  shadow-md duration-300 hover:scale-105 hover:shadow-lg border-2 border-button border-opacity-5 h-[450px] flex flex-col'>
                  <div className='relative'>
                    <Image
                      className='w-full h-[290px] object-cover object-center'
                      src={product.images[currentImageIndexes[index]]}
                      alt='Product Image'
                      width={300}
                      height={300}
                      layout='responsive'
                    />
                  </div>
                  <div className='p-4 flex flex-col justify-between flex-grow'>
                    <h2 className='mb-2 text-lg font-medium dark:text-text text-gray-900 text-center'>
                      {product.title}
                    </h2>

                    <div className='flex items-center justify-center'>
                      <p className='mr-[110px] text-lg font-semibold text-gray-900 dark:text-button'>
                        €{formatPrice(product.price)}
                      </p>
                      <button
                        className='relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-white hover:text-border rounded-lg group bg-gradient-to-br from-third to-primary group-hover:from-third group-hover:to-primary hover:text-text2 dark:text-text2'
                        onClick={() => redirectToPost(product._id)}
                      >
                        <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-button dark:bg-button rounded-md border-2 border-button hover:border-2 hover:bg-white hover:text-button'>
                          Plačiau
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
