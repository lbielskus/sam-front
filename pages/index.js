import { mongooseConnect } from '../lib/mongoose';
import Banner from '../components/Banner';
import Products from '../components/Products';
import Collection from '../components/Collection';
import ContactDiv from '../components/ContactDiv';
import BlogSlide from '../components/BlogSlide';
import SlidingCategories from '../components/SlidingCategories';
import MumisPasitiki from '../components/MumisPasitiki';
import IconCards from '../components/IconCards';
import ContactForm from '../components/ContactForm';
import HeroSlider from '../components/Hero1';
import { Product } from '../models/Product';
import { Blog } from '../models/Blog';
import CategoryModel from '../models/Category';
import Media from '../models/Media';

import { DefaultSeo } from 'next-seo';

export default function Home({
  newProducts,
  collectionProduct1,
  blogPosts,
  pricingProducts,
  categories,
  mediaData,
}) {
  const imageUrl =
    'https://res.cloudinary.com/dtv9ufmel/image/upload/fl_preserve_transparency/v1712314004/2_twafhk.jpg?_s=public-apps';

  return (
    <main className='h-full p-4 bg-background'>
      <DefaultSeo
        title='VandensTalpos.lt'
        description='Išskirtiniai plastikiniai gaminiai namams ir sodui'
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
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <HeroSlider mediaData={mediaData} />
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <IconCards />
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <SlidingCategories categories={categories} />
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <Products products={newProducts} />
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <BlogSlide posts={blogPosts} />
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <Banner imageUrl={imageUrl} title='Banner' />
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <MumisPasitiki />
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <ContactForm />
    </main>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const collectionId = '65814c59ebe487e1589d437e';

  const collectionProduct1 = await Product.findById(collectionId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: 1 },
    limit: 3,
  });

  const blogPosts = await Blog.find().sort({ createdAt: -1 }).limit(5);

  const pricingProducts = await Product.find({
    _id: {
      $in: [
        '65e64f0f283b34d56e536412',
        '65ec4f3fcf19fe7cb322f75e',
        '65ec50cbcf19fe7cb322f775',
        '65ec526ccf19fe7cb322f782',
      ],
    },
  });

  const categories = await CategoryModel.find().lean().exec();

  const categoriesWithStrings = categories.map((category) => ({
    ...category,
    _id: category._id.toString(),
    parent: category.parent ? category.parent.toString() : null,
  }));

  const mediaData = await fetchMediaData();
  console.log('Media Data:', mediaData);

  return {
    props: {
      collectionProduct1: collectionProduct1
        ? JSON.parse(JSON.stringify(collectionProduct1))
        : null,
      newProducts: newProducts ? JSON.parse(JSON.stringify(newProducts)) : null,
      blogPosts: blogPosts ? JSON.parse(JSON.stringify(blogPosts)) : null,
      pricingProducts: pricingProducts
        ? JSON.parse(JSON.stringify(pricingProducts))
        : null,
      categories: categoriesWithStrings,
      mediaData: mediaData,
    },
  };
}

async function fetchMediaData() {
  try {
    const response = await fetch('/api/images');
    if (!response.ok) {
      throw new Error('Failed to fetch media data');
    }
    const data = await response.json();
    console.log('Media Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching media data:', error);
    return [];
  }
}
