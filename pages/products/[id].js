import { CartContext } from '../../lib/CartContext';
import { mongooseConnect } from '../../lib/mongoose';
import { Product } from '../../models/Product';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import sanitizeHtml from 'sanitize-html';
import { useRouter } from 'next/router';
import CategoryModel from '../../models/Category';

import styles from '../../styles/singleproduct.module.css';
import { NextSeo } from 'next-seo';

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const calculatePriceWithTaxes = (price) => {
  const taxRate = 0.21;
  const vat = price * taxRate;
  const total = price + vat;
  return { vat: vat.toFixed(2), total: total.toFixed(2) };
};

export default function ProductPage({ product }) {
  const router = useRouter();
  const { addProduct } = useContext(CartContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  if (product) {
    const { vat, total } = calculatePriceWithTaxes(product.price);

    const sanitizedDetails = sanitizeHtml(product.details, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'span',
        'div',
        'ul',
        'ol',
        'li',
      ]),
      allowedAttributes: sanitizeHtml.defaults.allowedAttributes,
    });

    const descriptionWithLineBreaks = product.description.replace(
      /\n/g,
      '<br>'
    );

    const toggleTab = (tab) => {
      setActiveTab(tab);
    };

    return (
      <>
        <NextSeo
          title={`${product.title}`}
          description={`${product.title} - ${product.description}`}
          openGraph={{
            type: 'website',
            locale: 'en_IE',
            url: 'https://yourwebsite.com/',
            site_name: 'Vandens Talpos',
            images: [
              {
                url: product.images[currentImageIndex],
                width: 1200,
                height: 630,
                alt: 'Product image',
              },
            ],
          }}
          twitter={{
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image',
          }}
        />
        <section className='mt-14 md:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-48 mr-2'>
          <div className='lg:col-span-1'>
            <div className='lg:aspect-h-2 lg:aspect-w-2 lg:rounded-lg overflow-hidden relative mt-11 ml-2 md:ml-4  lg:ml-22 xl:ml-44'>
              <div className='relative mb-4 flex justify-center items-center ml-auto'>
                <button
                  onClick={handlePreviousImage}
                  className={`${styles['arrow-button']} ${styles['left-arrow']} bg-button bg-opacity-75 text-gray-100 rounded-full p-2 w-10 h-10 mr-4`}
                >
                  {'<'}
                </button>
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.images[currentImageIndex]}
                  width={400}
                  height={400}
                  className='w-full h-full object-contain border-2 border-button border-opacity-10 rounded-lg bg-gray-200 max-h-[350px] md:max-h-[500px] lg:max-h-[500px] max-w-[300px] md:max-w-[500px] lg:max-w-[500px] min-h-[200px] md:min-h-[300px] lg:min-h-[300px] min-w-[200px] md:min-w-[200px] lg:min-w-[300px]'
                />
                <button
                  onClick={handleNextImage}
                  className={`${styles['arrow-button']} ${styles['right-arrow']} bg-button bg-opacity-75 text-gray-100 rounded-full p-2 w-10 h-10 ml-4`}
                >
                  {'>'}
                </button>
              </div>
            </div>
          </div>

          <div className='lg:col-span-1 p-4 lg:p-8 '>
            <h1 className='text-3xl font-semibold text-gray-900'>
              {product.title}
            </h1>
            <div className='mt-4 flex  items-center'>
              <h2 className='text-xl font-semibold text-gray-900'>Kaina:</h2>
              <p className='ml-4  text-button font-semibold text-xl'>
                € {formatPrice(product.price)}
              </p>
            </div>

            <div className='mt-11'>
              <h2 className='text-lg font-semibold text-gray-900 mb-6'>
                Pagrindinė informacija
              </h2>

              <div>
                {sanitizedDetails.split('\n').map((detail, index) => (
                  <div key={index}>{detail}</div>
                ))}
              </div>
            </div>

            <div className='flex justify-start mt-8'>
              <button
                className='bg-button text-white py-2 px-4 rounded-md hover:bg-button-dark w-[192px]'
                onClick={() => {
                  router.push('/contact');
                }}
              >
                Pateikti užklausą
              </button>
            </div>
          </div>

          <div className='lg:col-span-2 mt-8 lg:mt-0 max-w-[300px] md:max-w-full  lg:max-w-full xl:max-w-full mx-auto'>
            <div className='flex flex-col justify-center items-center'>
              <div className='flex flex-wrap justify-center'>
                <button
                  className={`py-2 px-4 text-md font-semibold ${
                    activeTab === 'description'
                      ? 'text-white bg-button rounded-md '
                      : 'text-gray-600'
                  } hover:text-gray-300 focus:outline-none m-2`}
                  onClick={() => toggleTab('description')}
                >
                  Aprašymas
                </button>
                <button
                  className={`py-2 px-4 text-md font-semibold ${
                    activeTab === 'moreInfo'
                      ? 'text-white bg-button rounded-md '
                      : 'text-gray-600'
                  } hover:text-gray-300 focus:outline-none m-2`}
                  onClick={() => toggleTab('moreInfo')}
                >
                  Daugiau informacijos
                </button>
              </div>

              <div className='mt-2 w-full min-w-[270px] max-w-[600px] mx-auto '>
                <div
                  className={`${activeTab === 'description' ? '' : 'hidden'}`}
                >
                  <h3 className='text-md font-semibold mt-4'>Aprašymas</h3>
                  <p
                    className='mt-2 text-gray-700'
                    dangerouslySetInnerHTML={{
                      __html: descriptionWithLineBreaks,
                    }}
                  ></p>
                </div>

                <div className={`${activeTab === 'moreInfo' ? '' : 'hidden'}`}>
                  <h3 className='text-md font-semibold mt-4'>
                    Daugiau informacijos
                  </h3>
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 my-3'>
                    <div>
                      <label className='text-gray-900 font-semibold'>
                        Gamintojas
                      </label>
                      <p className='mt-2 text-gray-700'>{product.brand}</p>
                    </div>
                    <div>
                      <label className='text-gray-900 font-semibold'>
                        Svoris
                      </label>
                      <p className='mt-2 text-gray-700'>{product.gender}</p>
                    </div>
                    <div>
                      <label className='text-gray-900 font-semibold'>
                        Tūris ir dydis
                      </label>
                      <p className='mt-2 text-gray-700'>{product.sizes}</p>
                    </div>
                    <div>
                      <label className='text-gray-900 font-semibold'>
                        Katalogo numeris
                      </label>
                      <p className='mt-2 text-gray-700'>{product.colors}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return <p className='text-center py-24'>Prekė nerasta.</p>;
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;

  let product = null;
  let categories = [];

  try {
    product = await Product.findById(id);
    const categoriesData = await CategoryModel.find().lean().exec();
    console.log('categoriesData:', categoriesData);
    categories = categoriesData.map((category) => ({
      _id: category._id.toString(),
      name: category.name,
    }));
  } catch (error) {
    console.error('Error fetching product or categories:', error);
  }

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      categories: categories,
    },
  };
}
