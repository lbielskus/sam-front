import React from 'react';
import Layout from '../../components/Layout';

const FAQ = () => {
  return (
    <Layout>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-semibold mb-4'>
          Frequently Asked Questions
        </h1>
        <p className='text-lg mb-4'>
          Here are some common questions about our web development services:
        </p>
        <ul className='list-disc ml-6'>
          <li className='mb-2'>Question 1?</li>
          <li className='mb-2'>Question 2?</li>
          <li className='mb-2'>Question 3?</li>
        </ul>
      </div>
    </Layout>
  );
};

export default FAQ;
