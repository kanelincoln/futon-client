import { useState } from 'react';

import Head from 'next/head';

import Header from '@/components/Header.js';
import SpaceWidget from '@/components/SpaceWidget';

import hStyles from '@/styles/Home.module.css';

import { gql, useQuery } from '@apollo/client';

const GetBoroughsWithSpaces = gql`
  query GetBoroughsWithSpaces {
    boroughsWithSpaces {
      id
      name
      spaces {
        id
        name
        affordability
        type
        wiFi,
        loudness
        power
        size
        space
        busyness
        coffee
        hotspot
        hours {
          day
          open
          close 
        }
        images {
          url
        }
        rules
        googleMaps
      }
    }
  }
`;

export default function Home() {
  const [selectedBorough, setSelectedBorough] = useState(null);
  
  const query = useQuery(GetBoroughsWithSpaces);
  
  const generateSpaceWidgets = () => {
    return spacesToShow.map((space, index) => {
      return (<SpaceWidget space={space} key={index} />);
    });
  };

  if (query.loading) {
    return <p>Loading...</p>;
  };
  
  if (query.error) {
    console.log('Error fetching data:', query.error);
  };
  
  const { boroughsWithSpaces } = query.data;

  // By default, we display the Spaces associated with the first item in the boroughsWithSpaces list.
  // Auto-increment columns in PostgreSQL start from 1, not 0.
  const spacesToShow = selectedBorough ? boroughsWithSpaces[selectedBorough.id - 1].spaces : boroughsWithSpaces[0].spaces;

  return (
    <>
      <Head>
        <title>Futon</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        selectedBorough={selectedBorough ? selectedBorough : boroughsWithSpaces[0]}
        setSelectedBorough={setSelectedBorough}
        dropdownOptions={boroughsWithSpaces}
      />
      
      <main className={hStyles.main}>
        {spacesToShow && generateSpaceWidgets()}
      </main>
    </>
  );
};