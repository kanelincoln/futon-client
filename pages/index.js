import Head from 'next/head';
import Header from '@/components/Header.js';
import homeStyles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Futon</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className={homeStyles.main}>
        <h1>Main</h1>
      </main>
    </>
  );
}
