import { useEffect, useState } from 'react';

import Head from 'next/head';

import Header from '@/components/Header.js';
import Text from '@/components/Text';
import SpaceWidget from '@/components/SpaceWidget';
import SubmitEmailWidget from '@/components/SubmitEmailWidget';

import useClientSideState from '../hooks/useClientSideState';

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
        comments
        googleMaps
      }
    }
  }
`;

export default function Home() {
  const query = useQuery(GetBoroughsWithSpaces);
  const [selectedBorough, setSelectedBorough] = useState({});
  const [emailSubmitted, setEmailSubmitted] = useClientSideState('emailSubmitted', null);

  useEffect(() => {
    if (query.data && query.data.boroughsWithSpaces && !selectedBorough.id) {
      setSelectedBorough(query.data.boroughsWithSpaces[0]);
    }
    
    window.scrollTo(0, 0);
  }, [query.data, selectedBorough]);

  if (query.loading) {
    return <p>Loading...</p>;
  }

  if (query.error) {
    console.log('Error fetching data:', query.error);
    return <p>Error occurred while fetching data.</p>;
  }

  const { boroughsWithSpaces } = query.data;
  const cutoff = 2;
  const spacesToShow = emailSubmitted
    ? selectedBorough.spaces || []
    : (selectedBorough.spaces || []).slice(0, cutoff);

  const generateSpaceWidgets = () => {
    return spacesToShow.map((space) => {
      return <SpaceWidget space={space} key={space.id} />;
    });
  };          

  const generateSpacesFoundNotice = () => {
    if (!selectedBorough.spaces) return null;

    const spacesLength = selectedBorough.spaces ? selectedBorough.spaces.length : 0;
    const singularOrPlural = spacesLength === 1 ? 'space' : 'spaces';

    return (
      <Text.P className={hStyles.spacesFoundNotice}>
        We&apos;ve found <span className={hStyles.numberOfSpacesFound}>{selectedBorough.spaces.length}</span> {singularOrPlural} in {selectedBorough.name}.
      </Text.P>
      );
  };

  const generateSubmitEmailWidget = () => {
    if (!selectedBorough.spaces) return null;

    const hiddenSpacesExist = selectedBorough.spaces.length > cutoff;

    return (
      !emailSubmitted && hiddenSpacesExist &&
        <SubmitEmailWidget
          numberOfSpacesHidden={selectedBorough.spaces.length - cutoff}
          selectedBorough={selectedBorough.name}
          setEmailSubmitted={setEmailSubmitted}
        />
    );
  }

  const removeEmail = () => {
    localStorage.removeItem('emailSubmitted');
    setEmailSubmitted(null);
  };

  return (
    <>
      <Head>
        <title>Futon</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        selectedBorough={selectedBorough}
        setSelectedBorough={setSelectedBorough}
        dropdownOptions={boroughsWithSpaces}
      />

      <main className={hStyles.main}>
        {generateSpacesFoundNotice()}
        {generateSpaceWidgets()}
        {generateSubmitEmailWidget()}
      </main>

      {/* <button onClick={removeEmail}>Remove emailSubmitted</button> */}
    </>
  );
};