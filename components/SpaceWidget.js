import Text from '@/components/Text';
import Table from '@/components/Table';
import Button from '@/components/Button';
import ImageCarousel from '@/components/ImageCarousel';

import swStyles from '@/styles/SpaceWidget.module.css';

export default function SpaceWidget({ space }) {
  const capitaliseFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const includeInTable = ['type', 'wiFi', 'hotspot', 'loudness', 'power', 'size', 'space', 'busyness', 'coffee', 'hours'];
  if (space.rules !== '') includeInTable.push('rules');

  const generateTableData = () => {
    return includeInTable.map((item) => {
      const displayLabel = item === 'wiFi' ? 'Wi-Fi' : capitaliseFirstLetter(item);
      const returnObj = { label: displayLabel, value: space[item] };

      return returnObj;
    });
  };

  const generateAffordabilityIndicator = (affordability) => {
    switch (space.affordability) {
      case 1: return (<><span className={swStyles.affordabilityFilled}>£</span>££££</>)
      case 2: return (<><span className={swStyles.affordabilityFilled}>££</span>£££</>)
      case 3: return (<><span className={swStyles.affordabilityFilled}>£££</span>££</>)
      case 4: return (<><span className={swStyles.affordabilityFilled}>££££</span>£</>)
      case 5: return (<><span className={swStyles.affordabilityFilled}>£££££</span></>)
    }
  };

  return (
    <section className={swStyles.container}>
      <div className={swStyles.leftColumn}>
        <ImageCarousel images={space.images} altText={space.name} />
      </div>

      <div className={swStyles.rightColumn}>
        <div className={swStyles.aboveTableInformationContainer}>
          <div>
            <Text.H1>{space.name}</Text.H1>
            <Text.H2>{generateAffordabilityIndicator(space.affordability)}</Text.H2>
          </div>
            <Button url={space.googleMaps}>Go</Button>
        </div>
        
        {space && <Table data={generateTableData()} shortList={['Wi-Fi', 'Hotspot', 'Loudness', 'Power']} />}
      </div>
    </section>
  );
};