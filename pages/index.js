import { useEffect, useState } from 'react';

import Head from 'next/head';

import Header from '@/components/Header.js';
import SpaceWidget from '@/components/SpaceWidget';
import homeStyles from '@/styles/Home.module.css';

import { gql, useQuery } from '@apollo/client';

const exampleSpaceIds = [0, 1, 2, 3, 4]; // To do: Get these from db.

const getBoroughsWithSpaces = gql`
  query GetBoroughsWithSpaces {
    boroughsWithSpaces {
        id
        name
        spaces {
          id
          name
        }
    }
  }
`;

export default function Home() {
  const [selectedBorough, setSelectedBorough] = useState(null);
  const [spaceIds, setSpaceIds] = useState(exampleSpaceIds); // To do: Replace 'exampleSpaceIds' with 'null'.
  
  const query = useQuery(getBoroughsWithSpaces);
  
  const generateSpaceWidgets = () => {
    return spaceIds.map((spaceId, index) => {
      return (<SpaceWidget spaceId={spaceId} key={index} />);
    });
  };

  if (query.loading) {
    return <p>Loading...</p>;
  };

  if (query.error) {
    console.log('Error fetching data:', query.error);
    return <p>Error...</p>;
  };

  const { boroughsWithSpaces } = query.data;

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
      
      <main className={homeStyles.main}>
        {/* <span onClick={handleOnClick}>Click me</span> */}
        {spaceIds && generateSpaceWidgets()}
      </main>
    </>
  );
}
