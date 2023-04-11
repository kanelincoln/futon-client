import { useState } from 'react';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:8080/v1/graphql', // To do: Replace this with env var, e.g. `${process.env.GRAPHQL_URL}`
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
