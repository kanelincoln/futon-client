import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import ImageCarousel from '@/components/ImageCarousel';
import Text from '@/components/Text';
import spaceWidgetStyles from '@/styles/SpaceWidget.module.css';

const exampleSpace = {
  id: '0',
  name: 'Co.',
  affordability: 3,
  tableData: [
    { label: 'Wi-Fi', icon: '/images/wi-fi.svg', value: 'None' },
    { label: 'Loudness', icon: '/images/loudness.svg', value: 'Quiet' },
    { label: 'Power', icon: '/images/power.svg', value: 'Plentiful' },
  ],
  urls: {
    directions: 'https://goo.gl/maps/RNDttRjL3ZaZa9KV6',
    instagram: 'https://www.instagram.com/co.londonn/?hl=en'
  }
};

const imagePaths = [
  "/images/test/co-1.jpeg",
  "/images/test/co-2.jpeg",
  "/images/test/co-3.jpeg"
];

export default function SpaceWidget({ spaceId }) {
  const [space, setSpace] = useState(exampleSpace); // To do: Set this to the data associated with the spaceId prop.

  const generateAffordabilityIndicator = (affordability) => {
    switch (affordability) {
      case 1: return (<><span className={spaceWidgetStyles.affordabilityFilled}>£</span>££££</>)
      case 2: return (<><span className={spaceWidgetStyles.affordabilityFilled}>££</span>£££</>)
      case 3: return (<><span className={spaceWidgetStyles.affordabilityFilled}>£££</span>££</>)
      case 4: return (<><span className={spaceWidgetStyles.affordabilityFilled}>££££</span>£</>)
      case 5: return (<><span className={spaceWidgetStyles.affordabilityFilled}>£££££</span></>)
    }
  };

  const generateTable = (tableData) => {
    return tableData.map((item, index) => {
      return (
        <div className={spaceWidgetStyles.tableRow} key={index}>
          <div className={spaceWidgetStyles.rowTitleContainer}>
            <Text.P
              className={spaceWidgetStyles.rowTitle}
              customStyles={{ color: 'rgba(51, 51, 51, 1)' }}
            >
              {item.label}
            </Text.P>
          </div>

          <div className={spaceWidgetStyles.rowIcon}>
            <Image
              height={20}
              width={20}
              src={item.icon}
              alt="The Wi-Fi icon"
            />
          </div>

          <div className={spaceWidgetStyles.rowDescription}>
            <Text.P>{item.value}</Text.P>
          </div>
        </div>
      );
    });
  };

  return (
    <section className={spaceWidgetStyles.container}>
      <div className={spaceWidgetStyles.leftColumn}>
        <ImageCarousel imagePaths={imagePaths} altText={space.name} />
      </div>

      <div className={spaceWidgetStyles.rightColumn}>
        <Text.H1>{space.name}</Text.H1>
        <Text.H2>{generateAffordabilityIndicator(space.affordability)}</Text.H2>
        
        <div className={spaceWidgetStyles.table}>
          {space && generateTable(space.tableData)}
        </div>

        <div className={spaceWidgetStyles.buttonContainer}>
          <Button url={`/space/${space.id}`}>Details</Button>
          <Button url={space.urls.directions} secondary>Go</Button>
        </div>
      </div>
    </section>
  );
};