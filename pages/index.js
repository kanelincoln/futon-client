import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header.js';
import SpaceWidget from '@/components/SpaceWidget';
import homeStyles from '@/styles/Home.module.css';

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

const exampleSpaceIds = [0]; // To do: Get these from db.

export default function Home() {
  const [selectedBorough, setSelectedBorough] = useState(dropdownOptions[0]);
  const [spaceIds, setSpaceIds] = useState(exampleSpaceIds); // To do: Replace 'exampleSpaceIds' with 'null'.

  useEffect(() => {
    // To do: Retrieve relevant exampleSpaceIds from db here.
    console.log('selectedBorough is:', selectedBorough);
  }, [selectedBorough, spaceIds]);
  
  const generateSpaceWidgets = () => {
    return spaceIds.map((spaceId, index) => {
      return (<SpaceWidget spaceId={spaceId} key={index} />);
    });
  };
  
  // To do: Delete this after testing.
  // const handleOnClick = () => {
  //   setSpaceIds(exampleSpaceIds);
  // };

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
