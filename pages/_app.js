import { useState } from 'react';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
      // uri: 'http://localhost:4000'
    }),
    cache: new InMemoryCache()
  });
};

const inter = Inter({
  weight: ['200', '300', '400', '500'],
  subsets: ['latin']
});

export default function App({ idToken, Component, pageProps }) {
  const [client] = useState(createApolloClient(idToken));

  return (
    <ApolloProvider client={client}>
      <style jsx global>
        {`
        :root {
          --inter-font: ${inter.style.fontFamily};
        }`
        }
      </style>

      <Component {...pageProps} />
    </ApolloProvider>
  );
}
