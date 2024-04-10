import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
import { MdMarkEmailRead } from 'react-icons/md';

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const router = useRouter();
  const { pathname } = router;

  const handleLinkClick = (href) => {
    setIsMobileNavOpen(false);
    setShowCategories(false);
    router.push(href);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <header className='bg-gray-100 sticky top-0 z-40 w-full px-2 lg:px-4 rounded-b-2xl shadow-xl'>
        <div className='mx-auto flex h-16 max-w-screen-2xl items-center justify-between border-b border-primary border-opacity-40 bg-third text-gray-700'>
          {/* Kategorijos button */}
          <div className='relative' style={{ width: '186px' }}>
            <button
              onClick={() => setShowCategories(!showCategories)}
              className='text-white font-small text-md hover:bg-hover3 rounded-md h-10 bg-button flex items-center justify-center'
              style={{ width: '186px', padding: '0 1rem' }}
            >
              <FiMenu className='mr-2' />
              <span>Kategorijos</span>
              {showCategories ? <FiChevronDown className='ml-1' /> : null}
            </button>
            {showCategories && (
              <div className='absolute left-0 top-full mt-1 bg-gray-300 p-2 rounded shadow-md'>
                <ul>
                  <li>
                    <Link href='/categories/660ce33c14dbf336fa813209'>
                      Visos prekės
                    </Link>
                  </li>
                  <li>
                    <Link href='/categories/66112f57fd2510974d5ec388'>
                      Vandens Rezervuarai
                    </Link>
                  </li>
                  <li>
                    <Link href='/categories/66112f95fd2510974d5ec38e'>
                      Agrikultūra
                    </Link>
                  </li>
                  <li>
                    <Link href='/categories/66117d076eb4dd94149286bd'>
                      Kiemas, Sodas
                    </Link>
                  </li>
                  <li>
                    <Link href='/categories/66117e476eb4dd94149286d9'>
                      Pramogos, Sportas
                    </Link>
                  </li>
                  <li>
                    <Link href='/blog'>Straipsniai</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <form onSubmit={handleSearchSubmit}>
            <input
              type='text'
              placeholder='Paieška'
              value={searchQuery}
              onChange={handleSearchChange}
              className='px-4 py-2 rounded-lg border border-gray-300 mr-2'
              style={{ width: '800px' }}
            />
            <button
              type='submit'
              className='px-4 py-2 bg-button hover:bg-hover3 text-white rounded-md'
            >
              Ieškoti
            </button>
          </form>

          <Link href='/contact'>
            <button
              className='ml-2 px-4 py-2 text-gray-700 flex items-center rounded-b-2xl'
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
