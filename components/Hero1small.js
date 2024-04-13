import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Hero1small = () => {
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
          className='relative w-full h-auto rounded-xl shadow-2xl overflow-hidden p-4'
        >
          {media.firstBanner && index === startIndex && (
            <>
              <div className='w-full h-[260px] sm:w-[400px] mx-auto'>
                <Image
                  src={media.images[0]}
                  alt={media.name}
                  layout='responsive'
                  width={400}
                  height={300}
                  objectFit='contain'
                  objectPosition='right'
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                  className='rounded-2xl'
                />
              </div>
              <div className='p-4 text-text'>
                <h2 className='text-xl font-semibold'>{media.name}</h2>
                <p className='text-sm mt-4'>{media.description}</p>
                <button
                  className='block bg-button hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 rounded'
                  onClick={() => handleButtonClick(media.route)}
                >
                  Prekės
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  );
};

export default Hero1small;
