import { useEffect, useState } from 'react';

import Head from 'next/head';

import Header from '@/components/Header.js';
import SpaceWidget from '@/components/SpaceWidget';
import homeStyles from '@/styles/Home.module.css';

import { gql, useQuery } from '@apollo/client';

const dropdownOptions = [
  { id: 1, name: 'Barking & Dagenham' },
  { id: 2, name: 'Barnet' },
  { id: 3, name: 'Bexley' },
  { id: 4, name: 'Brent' },
  { id: 5, name: 'Bromley' },
  { id: 6, name: 'Camden' },
  { id: 7, name: 'City of London' },
  { id: 8, name: 'Croydon' },
  { id: 9, name: 'Ealing' },
  { id: 10, name: 'Enfield' },
  { id: 11, name: 'Greenwich' },
  { id: 12, name: 'Hackney' },
  { id: 13, name: 'Hammersmith & Fulham' },
  { id: 14, name: 'Haringey' },
  { id: 15, name: 'Harrow' },
  { id: 16, name: 'Havering' },
  { id: 17, name: 'Hillingdon' },
  { id: 18, name: 'Hounslow' },
  { id: 19, name: 'Islington' },
  { id: 20, name: 'Kensington & Chelsea' },
  { id: 21, name: 'Kingston upon Thames' },
  { id: 22, name: 'Lambeth' },
  { id: 23, name: 'Lewisham' },
  { id: 24, name: 'Merton' },
  { id: 25, name: 'Newham' },
  { id: 26, name: 'Redbridge' },
  { id: 27, name: 'Richmond upon Thames' },
  { id: 28, name: 'Southwark' },
  { id: 29, name: 'Sutton' },
  { id: 30, name: 'Tower Hamlets' },
  { id: 31, name: 'Waltham Forest' },
  { id: 32, name: 'Wandsworth' },
  { id: 33, name: 'Westminster' }
];

const exampleSpaceIds = [0, 1, 2, 3, 4]; // To do: Get these from db.

const GET_BOROUGHS_WITH_SPACES = gql`
  query BoroughsWithSpaces {
    boroughs(where: { spaces: { borough_id: { _is_null: false } } }) {
      name
    }
  }
`;

export default function Home() {
  const [selectedBorough, setSelectedBorough] = useState(dropdownOptions[0]);
  const [spaceIds, setSpaceIds] = useState(exampleSpaceIds); // To do: Replace 'exampleSpaceIds' with 'null'.
  
  // Fetch data
  const { loading, error, data, refetch } = useQuery(GET_BOROUGHS_WITH_SPACES);

  // useEffect(() => {
  //   // To do: Retrieve list of boroughs containing at least a single entry/space.
  //   // e.g. if we've found no spaces in Barnet, don't present Barnet as an option in dropdown.
  // });

  useEffect(() => {
    // To do: Retrieve relevant exampleSpaceIds from db here.
    console.log('selectedBorough is:', selectedBorough);
  }, [selectedBorough, spaceIds]);
  
  const generateSpaceWidgets = () => {
    return spaceIds.map((spaceId, index) => {
      return (<SpaceWidget spaceId={spaceId} key={index} />);
    });
  };


  if (loading) {
    return <p>Loading...</p>;
  };

  if (error) {
    console.log('Error fetching data:', error)
  };

  console.log('data is:', data);

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
        dropdownOptions={dropdownOptions}
      />
      
      <main className={homeStyles.main}>
        {/* <span onClick={handleOnClick}>Click me</span> */}
        {spaceIds && generateSpaceWidgets()}
      </main>
    </>
  );
}
