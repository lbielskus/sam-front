import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { loginUser } from '../../helpers';
import { AiOutlineMail, AiOutlineUnlock } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { RiLockPasswordLine } from 'react-icons/ri';
import Link from 'next/link';
import Image from 'next/image';
import axios, { AxiosError } from 'axios';

interface InputErrors {
  [key: string]: string;
}

const SignupForm = () => {
  const [data, setData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] = useState<InputErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateData = () => {
    const errors: InputErrors = {};

    if (data.fullName.length < 4) {
      errors.fullName = 'Full name must be at least 4 characters long';
    } else if (data.fullName.length > 30) {
      errors.fullName = 'Full name should be less than 30 characters';
    } else if (data.password.length < 6) {
      errors.password = 'Password should be at least 6 characters long';
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validateData();

    if (isValid) {
      try {
        setLoading(true);
        const apiRes = await axios.post(
          'http://localhost:3000/api/auth/signup',
          data
        );

        if (apiRes?.data?.success) {
          const loginRes = await loginUser({
            email: data.email,
            password: data.password,
          });

          if (loginRes && !loginRes.ok) {
            setSubmitError(loginRes.error || '');
          } else {
            router.push('/');
          }
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data?.error;
          setSubmitError(errorMsg);
        }
      }

      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const getErrorMsg = (fieldName: string) => {
    return validationErrors[fieldName] || '';
  };

  return (
    <section className='bg-gray-50 dark:bg-gray-300'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 text-center'>
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
        <div className=' w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-third dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8 '>
            <h1 className=' text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center'>
              Sign Up
            </h1>
            <form
              className='space-y-4 md:space-y-6 w-full '
              onSubmit={handleSignup}
            >
              <div className='flex items-center gap-4 '>
                <BsPerson className='text-white' />
                <input
                  type='text'
                  placeholder='Full Name'
                  value={data.fullName}
                  name='fullName'
                  onChange={handleInputChange}
                  className='input-field'
                  style={{ width: '90%' }}
                />
              </div>
              {validationErrors.fullName && (
                <p className='text-red-500 text-sm '>
                  {validationErrors.fullName}
                </p>
              )}

              <div className='flex items-center gap-4 '>
                <AiOutlineMail className='text-white' />
                <input
                  type='email'
                  placeholder='Email'
                  value={data.email}
                  name='email'
                  onChange={handleInputChange}
                  className='input-field'
                  style={{ width: '90%' }}
                />
              </div>

              <div className='flex items-center gap-4'>
                <AiOutlineUnlock className='text-white' />
                <input
                  type='password'
                  placeholder='Password'
                  value={data.password}
                  name='password'
                  onChange={handleInputChange}
                  className='input-field'
                  style={{ width: '90%' }}
                />
              </div>
              {validationErrors.password && (
                <p className='text-red-500 text-sm'>
                  {validationErrors.password}
                </p>
              )}

              <div className='flex items-center gap-4'>
                <RiLockPasswordLine className='text-white' />
                <input
                  type='password'
                  placeholder='Confirm Password'
                  value={data.confirmPassword}
                  name='confirmPassword'
                  onChange={handleInputChange}
                  className='input-field'
                  style={{ width: '90%' }}
                />
              </div>
              {validationErrors.confirmPassword && (
                <p className='text-red-500 text-sm'>
                  {validationErrors.confirmPassword}
                </p>
              )}

              <button
                type='submit'
                className='w-full text-white bg-purple-900 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Sign Up'}
              </button>

              {submitError && (
                <p className='text-red-500 text-sm text-center'>
                  {submitError}
                </p>
              )}

              <div className='flex items-center justify-center'>
                <p className='text-sm text-white'>
                  Already have an account?
                  <Link
                    href='/login'
                    className='text-purple-500 hover:underline'
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
