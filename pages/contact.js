import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import ContactForm from '../components/ContactForm';

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
