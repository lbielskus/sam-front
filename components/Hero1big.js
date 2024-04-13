import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Hero1big = () => {
  const [visibleMedia, setVisibleMedia] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const response = await fetch('/api/images');
        if (!response.ok) {
          throw new Error('Failed to fetch media data');
        }
        const data = await response.json();

        const filteredData = data.filter((media) => media.firstBanner);
        setVisibleMedia(filteredData);
        console.log(filteredData);
      } catch (error) {
        console.error('Error fetching media data:', error);
      }
    };

    fetchMediaData();
  }, []);

  const handleButtonClick = (route) => {
    router.push(route);
  };

  return (
    <section className='flex justify-center items-center bg-banner rounded-xl'>
      {visibleMedia.map((media, index) => (
        <div
          key={index}
          className='relative w-full h-0 rounded-xl shadow-2xl overflow-hidden'
          style={{ paddingBottom: '24%' }}
        >
          {media.firstBanner && index === startIndex && (
            <div>
              <Image
                src={media.images[0]}
                alt={media.name}
                layout='fill'
                objectFit='contain'
                objectPosition='right'
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
                className='rounded-2xl '
              />
              <div
                className='absolute top-10 left-10 p-4 text-text'
                style={{ zIndex: 1 }}
              >
                <h2 className='text-xl font-semibold'>{media.name}</h2>
                <p className='text-sm mt-4'>{media.description}</p>
              </div>
              <div
                className='absolute bottom-10 left-10 p-4 text-text'
                style={{ zIndex: 1 }}
              >
                <button
                  className='bg-button hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                  onClick={() => handleButtonClick(media.route)}
                >
                  Prekės
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Hero1big;
