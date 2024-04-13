import '../styles/globals.css';
import { Montserrat } from 'next/font/google';
import CategoryModel from '../models/Category';
import { mongooseConnect } from '../lib/mongoose';
import { DefaultSeo } from 'next-seo';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartContextProvider } from '../lib/CartContext';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import ContactButton from '../components/ContactButton';
import '../styles/buttonStyles.module.scss';
import TopBanner from '../components/TopBanner';
import Top2Banner from '../components/Top2Banner';
import BackToTopButton from '../components/BackToTopButton';
import { useState, useEffect } from 'react';

const montserrat = Montserrat({
  subsets: ['latin'],
});

interface MyAppProps extends AppProps {
  categories: (typeof CategoryModel)[];
}

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const router = useRouter();
  const { pathname } = router;
  const [showCategories, setShowCategories] = useState(false);

  let showNavbar = true;

  if (
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/forgot-password'
  ) {
    showNavbar = false;
  }

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
      <DefaultSeo
        title='VandensTalpos.lt'
        description='Išskirtiniai plastikiniai gaminiai namams ir sodui'
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://yourwebsite.com/',
          site_name: 'Vandens Talpos',
          images: [
            {
              url: 'https://res.cloudinary.com/dtv9ufmel/image/upload/v1712755967/ecommerce-app/nkdyueoqvtwbc215unry.png',
              width: 1200,
              height: 630,
              alt: 'Roto image',
            },
          ],
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <SessionProvider session={pageProps.session}>
        <CartContextProvider>
          <main
            className={`${montserrat.className} min-h-screen max-w-screen-2xl mx-auto bg-background sm:px-6`}
          >
            <Top2Banner />
            <TopBanner />

            <Header
              categories={pageProps.categories}
              showCategories={showCategories}
              setShowCategories={setShowCategories}
            />
            <Toaster position='top-center' />
            <Component
              {...pageProps}
              className={montserrat.className + ' sm:mt-36'}
            />
            <Footer />
            <ContactButton />
            <BackToTopButton />
          </main>
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}
