import { useState } from 'react';
import Button from '@/components/Button';
import ImageCarousel from '@/components/ImageCarousel';
import Text from '@/components/Text';
import spaceWidgetStyles from '@/styles/SpaceWidget.module.css';
import Table from '@/components/Table';

const exampleSpace = {
  id: '0',
  name: 'Co.',
  affordability: 3,
  tabular: [
    { label: 'Type', value: 'Cafe' },    
    { label: 'Wi-Fi', value: 'None' },
    { label: 'Loudness', value: 'Quiet' },
    { label: 'Power', value: 'Plentiful' },
    { label: 'Size', value: 'Medium (16 – 30)' },
    { label: 'Space', value: 'Moderate' },
    { label: 'Busyness', value: 'Quiet' },
    { label: 'Coffee', value: 'Good' },
    { label: 'Hotspot', value: 'Fast' },
    { label: 'Website', value: 'www.co-london.co.uk'},
    { label: 'Tube', value: 'Knightsbridge' },
    // { label: 'Hours', value: ['08:00 – 17:00', '08:00 – 17:00'],
    // { label: 'Rules', value: '' }
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

  return (
    <section className={spaceWidgetStyles.container}>
      <div className={spaceWidgetStyles.leftColumn}>
        <ImageCarousel imagePaths={imagePaths} altText={space.name} />
      </div>

      <div className={spaceWidgetStyles.rightColumn}>
        <div className={spaceWidgetStyles.aboveTableInformationContainer}>
          <div>
            <Text.H1>{space.name}</Text.H1>
            <Text.H2>{generateAffordabilityIndicator(space.affordability)}</Text.H2>
          </div>
            <Button url={space.urls.directions}>Go</Button>
        </div>
        
        {space && <Table data={space.tabular} shortList={['Wi-Fi', 'Loudness', 'Power']} />}
      </div>
    </section>
  );
};