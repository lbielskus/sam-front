import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { loginUser } from '../../helpers';
import { AiOutlineMail, AiOutlineUnlock } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const router = useRouter();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);

      const loginRes = await loginUser({ email, password });

      if (loginRes && !loginRes.ok) {
        setSubmitError(loginRes.error || '');
      } else {
        router.push('/');
      }
    } catch (error) {
      setSubmitError('An error occurred. Please try again later.');
    }

    setLoading(false);
  };

  useEffect(() => {
    const redirectUser = async () => {
      if (!loading && submitError === '' && email !== '' && password !== '') {
        try {
          setLoading(true);

          const loginRes = await loginUser({ email, password });

          if (loginRes && !loginRes.ok) {
            setSubmitError(loginRes.error || '');
          } else {
            router.push('/');
          }
        } catch (error) {
          setSubmitError('An error occurred. Please try again later.');
        }

        setLoading(false);
      }
    };

    redirectUser();
  }, [loading, submitError, email, password, router]);

  return (
    <section className='bg-gray-50 dark:bg-gray-300 text-center items-center'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <Link
          href='/'
          className='mb-10 flex gap-1 items-center text-text font-medium text-lg hover:text-zinc-400'
        >
          <Image
            src='https://res.cloudinary.com/dcknlnne1/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1709827936/favicon-32x32_rllh9h.jpg?_s=public-apps'
            alt='Logo'
            width={28}
            height={28}
            className='h-7 w-7'
          />
          <span className='text-purple'> Websites</span>
        </Link>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-third dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center'>
              Sign in
            </h1>
            <form className='space-y-4 md:space-y-6 ' onSubmit={handleLogin}>
              <div className='input-group'>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='example@email.com'
                  value={email}
                  onChange={handleEmailChange}
                  className='input-field'
                  required
                />
              </div>
              <div className='input-group'>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  value={password}
                  onChange={handlePasswordChange}
                  className='input-field'
                  required
                />
              </div>
              <div className='flex items-center justify-between text-center'>
                <div className='flex items-center text-center'>
                  <div className='flex items-center h-5 '>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      className=' w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                    />
                  </div>
                  <div className='ml-3 text-sm '>
                    <label
                      htmlFor='remember'
                      className='text-gray-500 dark:text-gray-300'
                    >
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
              <div className=' items-center'>
                <button
                  type='submit'
                  className='w-full text-white bg-purple-900 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Sign in'}
                </button>
              </div>
              <div className=' items-center'>
                <Link href='/signup'>
                  <div className='w-full text-white bg-gray-700 bg-opacity-90 hover:bg-gray-600 hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                    {loading ? 'Processing...' : 'Create account'}
                  </div>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
