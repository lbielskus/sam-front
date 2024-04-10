import { CartContext } from '../../lib/CartContext';
import { mongooseConnect } from '../../lib/mongoose';
import { Product } from '../../models/Product';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import sanitizeHtml from 'sanitize-html';
import { useRouter } from 'next/router';

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
      <section className='mt-14 md:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-48 mr-11'>
        <div className='lg:col-span-1'>
          <div className='lg:aspect-h-2 lg:aspect-w-2 lg:rounded-lg overflow-hidden relative mt-11 ml-44'>
            <div className='relative mb-4'>
              <Image
                src={product.images[currentImageIndex]}
                alt={product.images[currentImageIndex]}
                width={400}
                height={400}
                className='w-full h-full object-contain border-2 border-button border-opacity-30 rounded-lg bg-gray-200 max-h-[400px] md:max-h-[500px] lg:max-h-[500px] max-w-[400px] md:max-w-[500px] lg:max-w-[500px]'
              />

              <button
                onClick={handleNextImage}
                className=' absolute top-1/2 right-9  bg-button bg-opacity-75 text-gray-100 rounded-full p-2 w-10 h-10'
              >
                {'>'}
              </button>

              <button
                onClick={handlePreviousImage}
                className='absolute top-1/2 left-1  bg-button bg-opacity-75 text-gray-100 rounded-full p-2 w-10 h-10'
              >
                {'<'}
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

          <div className='flex justify-start mt-4'>
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

        <div className='lg:col-span-2 mt-8 lg:mt-0 mx-48'>
          <div className='border-t border-gray-300'>
            <div className='flex justify-center'>
              <button
                className={`py-2 px-4 text-md font-semibold ${
                  activeTab === 'description'
                    ? 'text-gray-900'
                    : 'text-gray-600'
                } hover:text-gray-900 focus:outline-none`}
                onClick={() => toggleTab('description')}
              >
                Aprašymas
              </button>
              <button
                className={`py-2 px-4 text-md font-semibold ${
                  activeTab === 'moreInfo' ? 'text-gray-900' : 'text-gray-600'
                } hover:text-gray-900 focus:outline-none`}
                onClick={() => toggleTab('moreInfo')}
              >
                Daugiau informacijos
              </button>
            </div>

            <div className='mt-2'>
              <div className={`${activeTab === 'description' ? '' : 'hidden'}`}>
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
    );
  }

  return <p>Product not found.</p>;
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
