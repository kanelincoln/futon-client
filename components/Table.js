import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Text from '@/components/Text';
import ExpandableRow from '@/components/ExpandableRow';
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
    const rowsRequiringUniqueFormatting = ['Hours', 'Rules'];
    if (!rowsRequiringUniqueFormatting.includes(nameOfRow)) return (<Text.P>{content}</Text.P>);

    switch (nameOfRow) {
      case 'Hours':
        return (
          // To do: Change colour of current day's information
          // To do: Show current day's opening hours on collapsed view
          <ExpandableRow contentWhenCollapsed={'Monday: 08:00 – 17:00'}>
            {content.map((data, index) => {
            return (<Text.P key={index} customStyles={{ marginBottom: '5px' }}>{data.day}: {data.hours}</Text.P>);
            })}
          </ExpandableRow>
        );
      case 'Rules':
        return (
        <ExpandableRow contentWhenCollapsed={content}>
          <Text.P>{content}</Text.P>
        </ExpandableRow>
      );
    }
  };

  const generateRows = (data) => {
    return data.map((item, index) => {
      return (
        <div className={rows.includes(item.label) ? tableStyles.tableRow : tableStyles.tableRowHidden} key={index}>
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
    });
  };

  return (
    <div className={tableStyles.container}>
      {rows && generateRows(data)}

      <div className={expanded ? tableStyles.toggleWhenExpanded : tableStyles.toggleWhenCollapsed} onClick={handleClick}>
        {expanded ? 'Less' : 'More'}
        <Image
          height={16}
          width={16}
          src='/images/dark-chevron-up.svg'
          alt={`An arrow pointing ${expanded ? 'up' : 'down'}`}
        />
      </div>
    </div>
  );
};