import { useEffect, useState } from 'react';
import Link from 'next/link';
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
    if (expanded) {
      setRows(shortList);
      setExpanded(false);
    } else {
      const keysOfDataObject = data.map((item) => item.label);
      setRows(keysOfDataObject);
      setExpanded(true);
    }
  };

  const generateLastColumn = (nameOfRow, content) => {
    const rowsRequiringUniqueFormatting = ['Website', 'Hours'];
    if (!rowsRequiringUniqueFormatting.includes(nameOfRow)) return (<Text.P>{content}</Text.P>);

    switch (nameOfRow) {
      case 'Website': return (<Text.P><Link href={content} target="_blank">{content}</Link></Text.P>)
      case 'Hours':
        return content.map((hours, index) => {
          // To do: Change colour of current day's information
          // To do: Show current day's opening hours on collapsed view
          const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
          return (<Text.P key={index} customStyles={{ marginBottom: '5px' }}>{days[index]}: {hours}</Text.P>);
        });
    }
  };

  const generateRows = (data) => {
    return data.map((item, index) => {
      if (rows.includes(item.label)) {
        return (
          <div className={tableStyles.tableRow} key={index}>
            <div>
              <Text.P
                className={tableStyles.rowTitle}
                customStyles={{ color: 'rgba(51, 51, 51, 1)' }}
              >
                {item.label}
              </Text.P>
            </div>

            <div>
              <Image
                height={20}
                width={20}
                src={'/images/icons/' + iconRefs[item.label]}
                alt={`The ${item.label} icon`}
              />
            </div>

            <div>
              {generateLastColumn(item.label, item.value)}
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div className={tableStyles.container}>
      {rows && generateRows(data)}
      <div className={tableStyles.toggle} onClick={handleClick}>
        {expanded ? 'Less' : 'More'}
        <Image
          height={16}
          width={16}
          src={`/images/${expanded ? 'dark-chevron-up.svg' : 'dark-chevron-down.svg'}`}
          alt={`An arrow pointing ${expanded ? 'up' : 'down'}`}
        />
      </div>
    </div>
  );
};