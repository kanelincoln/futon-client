import { useEffect, useState } from 'react';
import Image from 'next/image';
import Text from '@/components/Text';
import tableStyles from '@/styles/Table.module.css';

export default function TableStyles({ data, shortList }) {
  const [rows, setRows] = useState(shortList);
  const [expanded, setExpanded] = useState(false);

  const iconRefs = {
    'Type': 'type.svg',
    'Wi-Fi': 'wi-fi.svg',
    'Loudness': 'loudness.svg',
    'Power': 'power.svg',
    'Size': 'size.svg',
    'Space': 'space.svg',
    'Busyness': 'busyness.svg',
    'Coffee': 'coffee.svg',
    'Hotspot': 'hotspot.svg',
    'Website': 'website.svg',
    'Tube': 'tube.svg',
    'Hours': 'hours.svg',
    'Rules': 'rules.svg'
  };

  const handleClick = () => {
    const keysOfDataObject = data.map((item) => item.label);
    setRows(keysOfDataObject);

    // To do: Change button label and icon.
    //
    // setExpanded(true);
  };

  const generateRows = (data) => {
    return data.map((item, index) => {
      if (rows.includes(item.label)) {
        return (
          <div className={tableStyles.tableRow} key={index}>
            <div className={tableStyles.rowTitleContainer}>
              <Text.P
                className={tableStyles.rowTitle}
                customStyles={{ color: 'rgba(51, 51, 51, 1)' }}
              >
                {item.label}
              </Text.P>
            </div>

            <div className={tableStyles.rowIcon}>
              <Image
                height={20}
                width={20}
                src={'/images/icons/' + iconRefs[item.label]}
                alt={`The ${item.label} icon`}
              />
            </div>

            <div className={tableStyles.rowDescription}>
              <Text.P>{item.value}</Text.P>
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div className={tableStyles.container}>
      {rows && generateRows(data)}
      <div className={tableStyles.button} onClick={handleClick}>Expand</div>
    </div>
  );
};