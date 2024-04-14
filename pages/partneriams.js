import React from 'react';
import Layout from '../components/Layout';
import MumisPasitiki from '../components/MumisPasitiki';

import { mongooseConnect } from '../lib/mongoose';
import { useRouter } from 'next/router';
import CategoryModel from '../models/Category';

const Partneriai = () => {
  return (
    <Layout>
      <div className='container mx-auto px-4 py-8'>
        <MumisPasitiki />
      </div>
    </Layout>
  );
};

export default Partneriai;

export async function getServerSideProps() {
  await mongooseConnect();

  let categories = [];

  try {
    categories = await CategoryModel.find().lean().exec();
    categories = categories.map((category) => ({
      ...category,
      _id: category._id.toString(),
      parent: category.parent ? category.parent.toString() : null,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  return {
    props: {
      categories,
    },
  };
}
