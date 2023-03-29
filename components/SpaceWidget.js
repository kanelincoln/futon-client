import { useState } from 'react';
import Image from 'next/image';
import ImageCarousel from '@/components/ImageCarousel';
import { Title, Subtitle, RowTitle, Body } from '@/components/Text';
import spaceWidgetStyles from '@/styles/SpaceWidget.module.css';

const exampleSpace = {
  id: '0',
  name: 'Co.',
  affordability: 3,
  tableData: [
    { label: 'Wi-Fi', icon: '/images/wi-fi.svg', value: 'None' },
    { label: 'Loudness', icon: '/images/loudness.svg', value: 'Quiet' },
    { label: 'Power', icon: '/images/power.svg', value: 'Plentiful' },
  ]
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
          <div className={spaceWidgetStyles.rowTitle}>
            <RowTitle>{item.label}</RowTitle>
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
            <Body>{item.value}</Body>
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
        <Title>{space.name}</Title>
        <Subtitle>{generateAffordabilityIndicator(space.affordability)}</Subtitle>
        
        <div className={spaceWidgetStyles.table}>
          {space && generateTable(space.tableData)}
        </div>
      </div>
    </section>
  );
};