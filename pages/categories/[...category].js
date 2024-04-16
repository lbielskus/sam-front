import { useEffect, useState } from 'react';
import { Product } from '../../models/Product';
import CategoryModel from '../../models/Category';
import { mongooseConnect } from '../../lib/mongoose';
import { useRouter } from 'next/router';
import Image from 'next/image';
import mongoose from 'mongoose';

import { NextSeo } from 'next-seo';

export default function CategoryPage({ products, categoryName }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  useEffect(() => {
    setCurrentPage(1);
  }, [router.query.category]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products
    ? products.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const redirectToPost = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <>
      <NextSeo
        title={`${categoryName}`}
        description={`${categoryName} `}
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
      <div className='bg-gray-100 rounded-2xl shadow-2xl pb-8 mt-4'>
        <div className='content-center py-10 max-w-screen-2xl'>
          <h2 className='text-2xl tracking-tight text-text text-center my-1'>
            {categoryName}
          </h2>
          <div className='flex justify-center mt-14 mb-4'>
            <nav aria-label='Page navigation example'>
              <ul className='flex items-center -space-x-px h-8 text-sm'>
                <li>
                  <button
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
                  </button>
                </li>
                {Array.from(
                  { length: Math.ceil(products.length / productsPerPage) },
                  (_, i) => (
                    <li key={i}>
                      <button
                        onClick={() => paginate(i + 1)}
                        className={`flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-button dark:bg-opacity-90 dark:border-gray-200 dark:text-white dark:hover:bg-red-400 dark:hover:text-white ${
                          i + 1 === currentPage
                            ? 'bg-blue-50 text-blue-600'
                            : ''
                        }`}
                      >
                        {i + 1}
                      </button>
                    </li>
                  )
                )}
                <li>
                  <button
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
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3'>
            {currentProducts?.length > 0 ? (
              currentProducts.map((product, index) => (
                <div
                  key={product._id}
                  className='group relative w-full sm:w-1/2 lg:w-1/3 xl:w-1/3 mx-auto'
                >
                  <div className='mx-auto mt-11 w-80 transform overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-50 to-red-50 dark:bg-gray-200 shadow-md duration-300 hover:scale-105 hover:shadow-lg border-2 border-button border-opacity-5 h-[450px] flex flex-col'>
                    <div className='relative'>
                      <Image
                        className='w-full h-[290px] object-cover object-center'
                        src={product.images[0]}
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
                          <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-button dark:bg-button rounded-md border-2 border-button hover:border-2 hover:bg-white hover:text-button '>
                            Plačiau
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='col-span-3 h-40 pt-11'>
                <p className='text-center text-gray-600'>
                  Šioje kategorijoje produktų nėra.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className='flex justify-center mt-4 mb-4'>
          <nav aria-label='Page navigation example'>
            <ul className='flex items-center -space-x-px h-8 text-sm'>
              <li>
                <button
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
                </button>
              </li>
              {Array.from(
                { length: Math.ceil(products.length / productsPerPage) },
                (_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => paginate(i + 1)}
                      className={`flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-button dark:bg-opacity-90 dark:border-gray-200 dark:text-white dark:hover:bg-red-400 dark:hover:text-white ${
                        i + 1 === currentPage ? 'bg-blue-50 text-blue-600' : ''
                      }`}
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}
              <li>
                <button
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
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

async function getCategoryIds(categoryId) {
  const category = await CategoryModel.findById(categoryId);
  if (!category) return [];

  let categoryIds = [categoryId];

  const subcategories = await CategoryModel.find({ parent: categoryId });
  for (const subcategory of subcategories) {
    const subcategoryIds = await getCategoryIds(subcategory._id);
    categoryIds = [...categoryIds, ...subcategoryIds];
  }

  return categoryIds;
}

export async function getServerSideProps({ params }) {
  await mongoose.connect(process.env.MONGODB_URI);

  const { category } = params;

  let categoryData;
  let categoryName;

  const isObjectId = /^[0-9a-fA-F]{24}$/.test(category);

  if (isObjectId) {
    categoryData = await CategoryModel.findById(category);
  } else {
    categoryData = await CategoryModel.findOne({ name: category });
  }

  if (categoryData) {
    categoryName = categoryData.name;

    let products;

    if (categoryName === 'Visos prekės') {
      products = await Product.find({});
    } else {
      const categoryIds = await getCategoryIds(categoryData._id);
      products = await Product.find({ category: { $in: categoryIds } });
    }

    const categories = await CategoryModel.find().lean().exec();
    const categoriesWithStrings = categories.map((category) => ({
      ...category,
      _id: category._id.toString(),
      parent: category.parent ? category.parent.toString() : null,
    }));

    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
        categoryName: categoryName,
        categories: categoriesWithStrings,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
}
