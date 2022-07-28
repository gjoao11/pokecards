import Document, { Head, Html, Main, NextScript } from 'next/document';
import { getCssText } from 'stitches.config';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />

          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap" rel="stylesheet" />

          <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
