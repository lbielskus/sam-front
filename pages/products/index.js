import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { mongooseConnect } from '../../lib/mongoose';
import { Product } from '../../models/Product';
import CategoryModel from '../../models/Category';

import styles from '../../styles/productspage.module.css';
import { NextSeo } from 'next-seo';

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function Products({ allProducts }) {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [currentImageIndexes, setCurrentImageIndexes] = useState(
    Array(allProducts.length).fill(0)
  );
  const router = useRouter();

  useEffect(() => {
    const filterProducts = () => {
      if (searchQuery === '') {
        setFilteredProducts(allProducts);
      } else {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = allProducts.filter((product) =>
          product.title.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredProducts(filtered);
      }
    };

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    filterProducts();
  }, [searchQuery, allProducts]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNextImage = (index) => {
    setCurrentImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[index] =
        (newIndexes[index] + 1) % filteredProducts[index].images.length;
      return newIndexes;
    });
  };

  const handlePreviousImage = (index) => {
    setCurrentImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[index] =
        newIndexes[index] === 0
          ? filteredProducts[index].images.length - 1
          : newIndexes[index] - 1;
      return newIndexes;
    });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts
    ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePreviousPage = (event) => {
    event.preventDefault();
    setCurrentPage((prevPage) => {
      const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
      const previousPage = prevPage - 1;
      if (previousPage < 1) {
        return totalPages;
      }
      return previousPage;
    });
  };

  const handleNextPage = (event) => {
    event.preventDefault();
    setCurrentPage((prevPage) => {
      const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
      const nextPage = prevPage + 1;
      if (nextPage > totalPages) {
        return 1;
      }
      return nextPage;
    });
  };

  const redirectToPost = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <>
      <NextSeo
        title='Visos prekės'
        description='Visos prekės'
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://yourwebsite.com/',
          site_name: 'Vandens Talpos',
          images: [
            {
              url: 'https://res.cloudinary.com/dtv9ufmel/image/upload/v1712755967/ecommerce-app/nkdyueoqvtwbc215unry.png',
              width: 1200,
              height: 630,
              alt: 'Roto image',
            },
          ],
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <div className='flex justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-red-50 rounded-2xl mt-5'>
        {loading ? (
          <div className='flex justify-center items-center min-h-screen w-full '>
            <Spinner />
          </div>
        ) : (
          <div className='mt-14 md:mt-6 w-full px-4 md:p-0 ml-4 mr-4'>
            <input
              type='text'
              placeholder='Prekių paieška'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='mb-4 px-4 py-2 rounded-xl border border-gray-300 w-full '
            />

            {filteredProducts.length === 0 ? (
              <p className='text-center text-gray-600'>
                No matching products found.
              </p>
            ) : (
              <>
                <div className='flex justify-center mt-4 mb-4'>
                  {filteredProducts.length > productsPerPage && (
                    <nav aria-label='Page navigation example'>
                      <ul className='flex items-center -space-x-px h-8 text-sm'>
                        <li>
                          <a
                            onClick={handlePreviousPage}
                            className='flex items-center justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white  border-e-0 border-gray-300 rounded-s-2xl hover:bg-gray-100 hover:text-gray-700 dark:bg-button dark:border-gray-200 dark:text-white dark:hover:bg-red-400 dark:hover:text-white'
                          >
                            <span className='sr-only'>Previous</span>
                            <svg
                              className='w-2.5 h-2.5 rtl:rotate-180'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 6 10'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M5 1 1 5l4 4'
                              />
                            </svg>
                          </a>
                        </li>
                        {Array.from(
                          {
                            length: Math.ceil(
                              filteredProducts.length / productsPerPage
                            ),
                          },
                          (_, i) => (
                            <li key={i}>
                              <a
                                onClick={() => paginate(i + 1)}
                                className={`flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white   hover:bg-gray-100 hover:text-gray-700 dark:bg-button dark:bg-opacity-90 dark:border-gray-200 dark:text-white dark:hover:bg-red-400 dark:hover:text-white ${
                                  i + 1 === currentPage
                                    ? 'bg-blue-50 text-blue-600'
                                    : ''
                                }`}
                              >
                                {i + 1}
                              </a>
                            </li>
                          )
                        )}
                        <li>
                          <a
                            onClick={handleNextPage}
                            className='flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white  rounded-e-2xl hover:bg-gray-100 hover:text-gray-700 dark:bg-button dark:border-gray-200 dark:text-white dark:hover:bg-red-400 dark:hover:text-white'
                          >
                            <span className='sr-only'>Next</span>
                            <svg
                              className='w-2.5 h-2.5 rtl:rotate-180'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 6 10'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='m1 9 4-4-4-4'
                              />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  )}
                </div>
                <div
                  className={`${styles['products-cards']} lg:ml-16 grid grid-cols-1 gap-x-3 md:gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 xl:gap-x-8 py-16 `}
                >
                  {currentProducts.map((product, index) => (
                    <div key={product._id} className='flex justify-center'>
                      <div className='rounded-xl group relative w-full'>
                        <div className='group block overflow-hidden border-2 border-button border-opacity-20 bg-white rounded-xl w-[340px] h-[580px]'>
                          <div className='p-1'>
                            <div className='relative h-[400px] sm:h-[400px]'>
                              {product.images.map((image, imgIndex) => (
                                <Image
                                  key={imgIndex}
                                  src={image}
                                  alt=''
                                  width={400}
                                  height={400}
                                  className={`absolute inset-0 h-full w-full object-contain ${
                                    imgIndex === currentImageIndexes[index]
                                      ? ''
                                      : 'hidden'
                                  }`}
                                />
                              ))}

                              <div className='absolute inset-y-0 left-0 flex items-center'>
                                <button
                                  onClick={() => handlePreviousImage(index)}
                                  className='bg-button bg-opacity-90 text-white w-8 h-8 rounded-full inline-flex justify-center items-center ml-3'
                                >
                                  {'<'}
                                </button>
                              </div>
                              <div className='absolute inset-y-0 right-0 flex items-center'>
                                <button
                                  onClick={() => handleNextImage(index)}
                                  className='bg-button bg-opacity-90 text-white w-8 h-8 rounded-full inline-flex justify-center items-center mr-3'
                                >
                                  {'>'}
                                </button>
                              </div>
                            </div>

                            <div className='relative p-2'>
                              <div className='p-4 flex flex-col justify-between flex-grow'>
                                <h2 className='mb-2 text-lg font-medium dark:text-text text-gray-900 text-center'>
                                  {product.title}
                                </h2>
                              </div>

                              <div className='flex items-center justify-center'>
                                <p className='mr-[110px] text-lg font-semibold text-gray-900 dark:text-button'>
                                  €{formatPrice(product.price)}
                                </p>
                                <button
                                  className='relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-white hover:text-border rounded-2xl group bg-gradient-to-br from-third to-primary group-hover:from-third group-hover:to-primary hover:text-text2 dark:text-text2'
                                  onClick={() => redirectToPost(product._id)}
                                >
                                  <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-button dark:bg-button rounded-2xl border-2 border-button hover:border-2 hover:bg-white hover:text-button '>
                                    Plačiau
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='flex justify-center mt-4 mb-4'>
                  {filteredProducts.length > productsPerPage && (
                    <nav aria-label='Page navigation example'>
                      <ul className='flex items-center -space-x-px h-8 text-sm'>
                        <li>
                          <a
                            onClick={handlePreviousPage}
                            className='flex items-center justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white  border-gray-300 rounded-s-2xl hover:bg-gray-100 hover:text-gray-700 dark:bg-button dark:border-gray-200 dark:text-white dark:hover:bg-red-400 dark:hover:text-white'
                          >
                            <span className='sr-only'>Previous</span>
                            <svg
                              className='w-2.5 h-2.5 rtl:rotate-180'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 6 10'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M5 1 1 5l4 4'
                              />
                            </svg>
                          </a>
                        </li>
                        {Array.from(
                          {
                            length: Math.ceil(
                              filteredProducts.length / productsPerPage
                            ),
                          },
                          (_, i) => (
                            <li key={i}>
                              <a
                                onClick={() => paginate(i + 1)}
                                className={`flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-button dark:bg-opacity-90 dark:border-gray-200 dark:text-white dark:hover:bg-red-400 dark:hover:text-white ${
                                  i + 1 === currentPage
                                    ? 'bg-blue-50 text-blue-600'
                                    : ''
                                }`}
                              >
                                {i + 1}
                              </a>
                            </li>
                          )
                        )}
                        <li>
                          <a
                            onClick={handleNextPage}
                            className='flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white  rounded-e-2xl hover:bg-gray-100 hover:text-gray-700 dark:bg-button dark:border-gray-200 dark:text-white dark:hover:bg-red-400 dark:hover:text-white'
                          >
                            <span className='sr-only'>Next</span>
                            <svg
                              className='w-2.5 h-2.5 rtl:rotate-180'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 6 10'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='m1 9 4-4-4-4'
                              />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps({ query, params = {} }) {
  await mongooseConnect();
  const { category } = params;
  const searchQuery = query.search || '';

  let allProducts;
  let categoryName = null;
  let categories = [];

  try {
    const categoriesData = await CategoryModel.find().lean().exec();
    categories = categoriesData.map((category) => ({
      _id: category._id.toString(),
      name: category.name,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  if (category) {
    let categoryData;

    const isObjectId = /^[0-9a-fA-F]{24}$/.test(category);

    if (isObjectId) {
      categoryData = await CategoryModel.findById(category);
    } else {
      categoryData = await CategoryModel.findOne({ name: category });
    }

    if (categoryData) {
      categoryName = categoryData.name;
      allProducts = await Product.find({ category: categoryData._id });
    } else {
      return {
        notFound: true,
      };
    }
  } else {
    if (searchQuery !== '') {
      allProducts = await Product.find({
        title: { $regex: new RegExp(searchQuery, 'i') },
      }).sort({ _id: 1 });
    } else {
      allProducts = await Product.find({}, null, { sort: { _id: 1 } });
    }
  }

  const productsWithIndexes = allProducts.map((product) => ({
    ...product.toObject(),
    currentImageIndex: 0,
  }));

  return {
    props: {
      allProducts: JSON.parse(JSON.stringify(productsWithIndexes)),

      categoryName: categoryName,
      categories: categories,
    },
  };
}
