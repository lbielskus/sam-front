import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Your Website Title</title>
        <meta name='description' content='Your website description' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header></header>
      <main>{children}</main>

      <footer></footer>
    </div>
  );
};

export default Layout;
