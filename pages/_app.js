import '@/styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['200', '300', '400', '500'],
  subsets: ['latin']
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>
        {`
        :root {
          --inter-font: ${inter.style.fontFamily};
        }`
        }
      </style>

      <Component {...pageProps} />
    </>
  );
}
