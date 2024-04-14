import { mongooseConnect } from '../../lib/mongoose';
import Categories from '../../components/Categories';
import CategoryModel from '../../models/Category';

import { NextSeo } from 'next-seo';

export default function CategoriesPage({ categories }) {
  return (
    <>
      <NextSeo
        title='Kategorijos'
        description='Kategorijos'
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
      <div>
        <Categories categories={categories} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  const categories = await CategoryModel.find().lean().exec();

  if (!categories) {
    return {
      notFound: true,
    };
  }

  const categoriesWithStrings = categories.map((category) => ({
    ...category,
    _id: category._id.toString(),
    parent: category.parent ? category.parent.toString() : null,
  }));

  return {
    props: {
      categories: categoriesWithStrings,
    },
  };
}
