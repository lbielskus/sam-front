import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel='preload'
            href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap'
            as='style'
          />

          <link rel='preload' href='/styles/globals.css' as='style' />

          <link rel='preload' href='/.next/static/chunks/main.js' as='script' />
          <link
            rel='preload'
            href='/.next/static/chunks/webpack.js'
            as='script'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
