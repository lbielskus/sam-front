import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import ContactForm from '../components/ContactForm';
import { mongooseConnect } from '../lib/mongoose';
import { useRouter } from 'next/router';
import CategoryModel from '../models/Category';

const ContactPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className='container mx-auto mt-8'>
      {loading ? (
        <div className='flex justify-center items-center min-h-screen'>
          <Spinner />
        </div>
      ) : (
        <>
          <h1 className='text-xl  mb-6 text-text text-center'>Susisiekite!</h1>
          <ContactForm />
        </>
      )}
    </div>
  );
};

export default ContactPage;

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
