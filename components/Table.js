import { useState } from 'react';

import Image from 'next/image';
import { format } from 'date-fns';

import Text from '@/components/Text';
import ExpandableRow from '@/components/ExpandableRow';

import tStyles from '@/styles/Table.module.css';

export default function TableStyles({ data, shortList }) {
  const [rows, setRows] = useState(shortList);
  const [expanded, setExpanded] = useState(false);

  const ratingsSchema = {
    'Wi-Fi': { 1: 'Very slow', 2: 'Slow', 3: 'OK', 4: 'Fast', 5: 'Very fast' },
    'Loudness': { 1: 'Silent', 2: 'Quiet', 3: 'Moderate', 4: 'Loud' },
    'Power': { 1: 'None', 2: 'Scant', 3: 'Available', 4: 'Plentiful' },
    'Size': { 1: 'Extra Small (1 – 5)', 2: 'Small (6 – 15)', 3: 'Medium (16 – 30)', 4: 'Large (31 – 50)', 5: 'Extra Large (50+)' },
    'Space': { 1: 'Tight', 2: 'Moderate', 3: 'Spacious' },
    'Busyness': { 1: 'Quiet', 2: 'Moderate', 3: 'Busy' },
    'Coffee': { 1: 'Very bad', 2 :'Bad', 3: 'OK', 4: 'Good', 5: 'Very good' },
    'Hotspot': { 1: 'Very slow', 2: 'Slow', 3: 'OK', 4: 'Fast', 5: 'Very fast' },
  };
  
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

  const convertRatingToAdjective = (row, rating) => {
    if (ratingsSchema[row]) return ratingsSchema[row][rating];
  };

  const generateLastColumn = (nameOfRow, content) => {
    const rowsRequiringUniqueFormatting = ['Type', 'Hours', 'Rules'];
    if (!rowsRequiringUniqueFormatting.includes(nameOfRow)) return (<Text.P>{convertRatingToAdjective(nameOfRow, content)}</Text.P>);

    switch (nameOfRow) {
      case 'Type':
        return (<Text.P>{content}</Text.P>);

      case 'Hours':
        const today = format(new Date(), 'EEEE');
        const hoursToday = () => {
          for (const hours of content) {
            if (hours.day === today) return `${hours.open} – ${hours.close}`;
          }
        };

        return (
          <ExpandableRow contentWhenCollapsed={`${today}: ${hoursToday()}`}>
            {content.map((hours, index) => {
              return (
                <Text.P
                  key={index}
                  className={hours.day === today ? tStyles.hoursToday : tStyles.hours}
                >
                  {hours.day}: {hours.open} – {hours.close}
                </Text.P>
              );
            })}
          </ExpandableRow>
        );
        
      case 'Rules':
        if (content) {
          return (
            <ExpandableRow contentWhenCollapsed={content}>
              <Text.P>{content}</Text.P>
            </ExpandableRow>
          );
        }
    }
  };

  const generateRows = (data) => {
    return data.map((item, index) => {
      return (
        <div className={rows.includes(item.label) ? tStyles.tableRow : tStyles.tableRowHidden} key={index}>
          <div>
            <Text.P
              className={tStyles.rowTitle}
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
    <div className={tStyles.container}>
      {rows && generateRows(data)}

      <div className={expanded ? tStyles.toggleWhenExpanded : tStyles.toggleWhenCollapsed} onClick={handleClick}>
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