import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
import { MdMarkEmailRead } from 'react-icons/md';
import { useRouter } from 'next/router';
import styles from '../styles/header.module.css';

interface HeaderProps {
  categories: any[];
  showCategories: boolean;
  setShowCategories: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({
  categories,
  showCategories,
  setShowCategories,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const renderCategories = (categories: any[]) => {
    return categories.map((category) => (
      <li key={category._id}>
        <Link href={`/categories/${category._id}`}>
          <div className='text-gray-800 hover:text-primary cursor-pointer py-1'>
            {category.name}
          </div>
        </Link>
      </li>
    ));
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setShowCategories(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  return (
    <>
      <header className='bg-gray-100 sticky top-0 z-40 w-full px-2 lg:px-4 rounded-b-2xl shadow-xl'>
        <div className='mx-auto flex h-16 max-w-screen-2xl items-center justify-between border-b border-primary border-opacity-40 bg-third text-gray-700'>
          <div className={`relative ${styles['center-kategorijos']}`}>
            <button
              onClick={toggleCategories}
              className='text-white font-small text-md hover:bg-hover3 rounded-md h-10 bg-button flex items-center justify-center'
              style={{ width: '186px', padding: '0 1rem' }}
            >
              <FiMenu className='mr-2' />
              <span>Kategorijos</span>
              {showCategories ? <FiChevronDown className='ml-1' /> : null}
            </button>
            {showCategories && categories && categories.length > 0 && (
              <div className='absolute left-1/2 transform -translate-x-1/2 top-full  mt-1 bg-gray-100 rounded shadow-md text-center w-[220px]'>
                <ul>{renderCategories(categories)}</ul>
              </div>
            )}
          </div>

          <form onSubmit={handleSearchSubmit} className='flex items-center'>
            <input
              type='text'
              placeholder='Paieška'
              value={searchQuery}
              onChange={handleSearchChange}
              className={`px-4 py-2 rounded-lg border border-gray-300 mr-2 ${styles['responsive-search-input']}`}
            />
            <button
              type='submit'
              className={`px-4 py-2 bg-button hover:bg-hover3 text-white rounded-md ${styles['hide-ieskoti']}`}
            >
              Ieškoti
            </button>
          </form>

          <Link href='/kontaktai'>
            <button
              className={`ml-2 px-4 py-2 text-gray-700 flex items-center rounded-b-2xl ${styles['hide-on-small-screen']}`}
              style={{ width: '220px' }}
            >
              <MdMarkEmailRead className='inline-block mr-2 text-3xl text-red-700' />
              Gauti pasiūlymą!
            </button>
          </Link>
        </div>
      </header>
    </>
  );
}
