import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '../lib/CartContext';
import toast from 'react-hot-toast';
import React from 'react';

import styles from '../styles/buttonStyles.module.scss';

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const calculatePriceWithTaxes = (price) => {
  const taxRate = 0.21;
  const totalPrice = price + price * taxRate;
  return totalPrice.toFixed(2);
};

const PricingPlans = ({ products }) => {
  const { addProduct } = useContext(CartContext);

  const productIds = [
    '65e64f0f283b34d56e536412',
    '65ec4f3fcf19fe7cb322f75e',
    '65ec50cbcf19fe7cb322f775',
    '65ec526ccf19fe7cb322f782',
  ];

  const filteredProducts = products.filter((product) =>
    productIds.includes(product._id)
  );

  return (
    <section className='bg-white dark:bg-third max-w-full rounded '>
      <div className='py-8 px-4 mx-auto lg:py-4 shadow-2xl'>
        <div className='mx-auto w-full text-center mb-8 lg:mb-12 '>
          <h2 className='mb-4 text-3xl tracking-tight font-extrabold text-third dark:text-white '>
            Designed for business visibility
          </h2>
          <p className='mb-5 font-light text-gray-500  dark:text-gray-400'>
            LB Web focus on markets where technology, innovation, and capital
            can unlock long-term value and drive economic growth.
          </p>
        </div>
        <div className='space-y-8 lg:grid lg:grid-cols-4 sm:gap-6 xl:gap-1 lg:space-y-0 w-full shadow-xl'>
          {filteredProducts?.length > 0 &&
            filteredProducts.map((product, index) => (
              <div
                key={product._id}
                className={`flex flex-col p-5 mx-auto max-w-80 lg:max-w-80 text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white ${
                  index > 0 ? 'mt-8 lg:mt-0' : ''
                }`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3 className=' text-2xl font-semibold'>{product.title}</h3>
                  <p className='font-light text-gray-500 text-sm dark:text-gray-400 text-left pt-9'>
                    {product.description.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>

                  {product.features && product.features.length > 0 && (
                    <div className='mb-8'>
                      {product.features.map((feature, index) => (
                        <div
                          key={index}
                          className='flex items-center space-x-3 '
                        >
                          <svg
                            className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400 '
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              fillRule='evenodd'
                              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                              clipRule='evenodd'
                            ></path>
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <div className='flex justify-center items-baseline my-8'>
                    <span className='text-gray-500 dark:text-gray-400 pr-3 '>
                      From
                    </span>
                    <span className='mr-2 text-3xl font-extrabold text-primary'>
                      {calculatePriceWithTaxes(product.price)}
                    </span>
                    <span className='text-gray-500 dark:text-gray-400'>€</span>
                  </div>
                  <button
                    onClick={() => {
                      addProduct(product._id);
                      toast.success('Item added to cart!!');
                    }}
                    type='button'
                    className={styles['draw-border']}
                  >
                    <div className='flex items-center space-x-2 py-2.5 px-3'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-5 h-5'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                        />
                      </svg>

                      <span>Add to cart</span>
                    </div>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
