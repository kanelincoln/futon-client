import { useEffect, useState } from 'react';

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
  const query = useQuery(GetBoroughsWithSpaces);
  const [selectedBorough, setSelectedBorough] = useState({});

  useEffect(() => {
    if (query.data && query.data.boroughsWithSpaces && !selectedBorough.id) {
      setSelectedBorough(query.data.boroughsWithSpaces[0]);
    }
  }, [query.data, selectedBorough]);

  if (query.loading) {
    return <p>Loading...</p>;
  }

  if (query.error) {
    console.log('Error fetching data:', query.error);
    return <p>Error occurred while fetching data.</p>;
  }

  const { boroughsWithSpaces } = query.data;
  const spacesToShow = selectedBorough.spaces || [];

  const generateSpaceWidgets = () => {
    return spacesToShow.map((space, index) => {
      return <SpaceWidget space={space} key={space.id} />;
    });
  };

  return (
    <>
      <Head>
        <title>Futon</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        selectedBorough={selectedBorough}
        setSelectedBorough={setSelectedBorough}
        dropdownOptions={boroughsWithSpaces}
      />

      <main className={hStyles.main}>{generateSpaceWidgets()}</main>
    </>
  );
};