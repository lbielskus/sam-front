import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import { AiOutlineArrowRight } from 'react-icons/ai';

const CongratulationTable = () => {
  return (
    <div className='max-w-2xl mx-auto mt-8 p-2 pb-8 bg-gradient-to-r from-indigo-50 to-red-100 bg-clip-border rounded-2xl shadow-2xl '>
      <h2 className='text-2xl font-semibold mb-9 mt-9 text-gray-700 text-center'>
        Dėkojame jums už jūsų užklausą!
      </h2>
      <div className=' text-gray-700  text-center'>
        <p>Jūsų užklausa išsiųsta sėkmingai.</p>
        <br></br>
        <p>Greitu metu, mūsų komanda su jumis susisieks.</p>
        <br></br>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!e.target.value.trim()) {
      e.target.setCustomValidity('Užpildykite privalomus laukus');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const handlephoneNumberChange = (e) => {
    setphoneNumber(e.target.value);

    if (!e.target.value.trim()) {
      e.target.setCustomValidity('Užpildykite privalomus laukus');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);

    if (!e.target.value.trim()) {
      e.target.setCustomValidity('Užpildykite privalomus laukus');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const handleClientEmailChange = (e) => {
    setClientEmail(e.target.value);

    if (!e.target.value.trim()) {
      e.target.setCustomValidity('Užpildykite privalomus laukus');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);

    if (!e.target.value.trim()) {
      e.target.setCustomValidity('Užpildykite privalomus laukus');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const phoneRegex = /^[+]?[0-9]*$/;

    if (!phoneRegex.test(phoneNumber)) {
      toast.error('Įveskite teisingą telefono numerį.', {
        duration: 3000,
        position: 'top-center',
      });
      setLoading(false);
      return;
    }

    const formData = {
      name,
      phoneNumber,
      subject,
      message,
      clientEmail,
    };

    try {
      const response = await fetch('/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Forma išsiųsta!');
        setName('');
        setphoneNumber('');
        setSubject('');
        setMessage('');
        setClientEmail('');

        toast.success('Pranešimas sėkmingai išsiųstas!', {
          duration: 3000,
          position: 'top-center',
        });
        setFormSubmitted(true);
      } else {
        console.error('Nepavyko išsiųsti pranešimo:', response.statusText);
      }
    } catch (error) {
      console.error('Nepavyko išsiųsti pranešimo:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {formSubmitted ? (
        <CongratulationTable />
      ) : (
        <div className='shadow-2xl max-w-full mx-auto mt-8 p-6  rounded-2xl bg-gradient-to-r from-gray-200 to-red-100 bg-clip-border '>
          <h2 className='text-2xl font-semibold mb-6 text-gray-700 text-center'>
            Turite klausimų? Turime atsakymus.
          </h2>
          <p className='pb-6  text-center text-gray-700  '>
            Ieškote daugiau informacijos apie mūsų gaminius arba reikia pagalbos
            pasirenkant tobulą variantą?
          </p>
          <p className='pb-11  text-center text-gray-700  '>
            Esame čia, kad padėtume iškilus klausimams. Susisiekite su mumis dėl
            iškilusių klausimų ir mūsų ekspertai jums padės!
          </p>
          {loading ? <Spinner /> : null}
          <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-6'>
            <div className='col-span-1'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Vardas: *
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={name}
                onChange={handleNameChange}
                className='mt-1 p-2 w-full border rounded-2xl bg-gray-300'
                required
              />
            </div>
            <div className='col-span-1'>
              <label
                htmlFor='phoneNumber'
                className='block text-sm font-medium text-gray-700'
              >
                Tel.Nr.: *
              </label>
              <input
                type='text'
                id='phoneNumber'
                name='phoneNumber'
                value={phoneNumber}
                onChange={handlephoneNumberChange}
                className='mt-1 p-2 w-full border rounded-2xl bg-gray-300'
                required
              />
            </div>
            <div className='col-span-1'>
              <label
                htmlFor='subject'
                className='block text-sm font-medium text-gray-700'
              >
                Tema: *
              </label>
              <input
                type='text'
                id='subject'
                name='subject'
                value={subject}
                onChange={handleSubjectChange}
                className='mt-1 p-2 w-full border rounded-2xl bg-gray-300'
                required
              />
            </div>
            <div className='col-span-1'>
              <label
                htmlFor='clientEmail'
                className='block text-sm font-medium text-gray-700'
              >
                El. Paštas: *
              </label>
              <input
                type='email'
                id='clientEmail'
                name='clientEmail'
                value={clientEmail}
                onChange={handleClientEmailChange}
                className='mt-1 p-2 w-full border rounded-2xl bg-gray-300'
                required
              />
            </div>
            <div className='col-span-2'>
              <label
                htmlFor='message'
                className='block text-sm font-medium text-gray-700'
              >
                Pranešimas: *
              </label>
              <textarea
                id='message'
                name='message'
                value={message}
                onChange={handleMessageChange}
                rows='4'
                className='mt-1 p-2 w-full border rounded-2xl bg-gray-300'
                required
              ></textarea>
              <div>
                <p className='textžgray-700 text-center pt-4'>
                  * Užpildykite privalomus laukus
                </p>
              </div>
            </div>

            <div className='col-span-2 flex justify-center'>
              <button
                type='submit'
                className='flex items-center px-8 py-2 bg-green-700 hover:bg-green-600 text-white rounded-xl focus:outline-none focus:ring focus:border-blue-300'
              >
                <span className='mr-2'>Išsiųsti</span>
                <AiOutlineArrowRight className='ml-4' />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
