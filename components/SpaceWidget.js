import { useState } from 'react';
import ImageCarousel from '@/components/ImageCarousel';
import spaceWidgetStyles from '@/styles/SpaceWidget.module.css';

const exampleSpace = {
  id: '0',
  name: 'Co.',
  affordability: 3,
  wifi: 'None',
  loudness: 'Quiet',
  power: 'Plentiful'
};

const imagePaths = [
  "/images/test/co-1.jpeg",
  "/images/test/co-2.jpeg",
  "/images/test/co-3.jpeg"
];

export default function SpaceWidget({ spaceId }) {
  const [space, setSpace] = useState(exampleSpace); // To do: Set this to the data associated with the spaceId prop.

  return (
    <section className={spaceWidgetStyles.container}>
      <div className={spaceWidgetStyles.leftColumn}>
        <ImageCarousel imagePaths={imagePaths} altText={space.name} />
        <h1>Left</h1>
      </div>

      <div className={spaceWidgetStyles.rightColumn}>
        <h2>Right</h2>
      </div>
    </section>
  );
};