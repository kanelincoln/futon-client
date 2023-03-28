import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import Image from 'next/image';
import headerStyles from '@/styles/Header.module.css';

const dropdownOptions = [
  { id: 1, name: 'Barking & Dagenham' },
  { id: 2, name: 'Barnet' },
  { id: 3, name: 'Bexley' },
  { id: 4, name: 'Brent' },
  { id: 5, name: 'Bromley' },
  { id: 6, name: 'Camden' },
  { id: 7, name: 'City of London' },
  { id: 8, name: 'Croydon' },
  { id: 9, name: 'Ealing' },
  { id: 10, name: 'Enfield' },
  { id: 11, name: 'Greenwich' },
  { id: 12, name: 'Hackney' },
  { id: 13, name: 'Hammersmith & Fulham' },
  { id: 14, name: 'Haringey' },
  { id: 15, name: 'Harrow' },
  { id: 16, name: 'Havering' },
  { id: 17, name: 'Hillingdon' },
  { id: 18, name: 'Hounslow' },
  { id: 19, name: 'Islington' },
  { id: 20, name: 'Kensington & Chelsea' },
  { id: 21, name: 'Kingston upon Thames' },
  { id: 22, name: 'Lambeth' },
  { id: 23, name: 'Lewisham' },
  { id: 24, name: 'Merton' },
  { id: 25, name: 'Newham' },
  { id: 26, name: 'Redbridge' },
  { id: 27, name: 'Richmond upon Thames' },
  { id: 28, name: 'Southwark' },
  { id: 29, name: 'Sutton' },
  { id: 30, name: 'Tower Hamlets' },
  { id: 31, name: 'Waltham Forest' },
  { id: 32, name: 'Wandsworth' },
  { id: 33, name: 'Westminster' }
];

export default function Header() {
  // To do: Add function to automatically locate user and set the dropdown to the relevant location.

  const [selectedBorough, setSelectedBorough] = useState(dropdownOptions[0]);

  const handleFilterClick = () => {
    console.log('Filter button has been clicked.');
  };

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.searchContainer}>
        <div className={headerStyles.dropdownContainer}>
          <Listbox value={selectedBorough} onChange={setSelectedBorough}>
            <Listbox.Button className={headerStyles.dropdownButton}>
              <span className={headerStyles.dropdownButtonLabel}>{selectedBorough.name}</span>
              <Image
                height={18}
                width={18}
                src="/images/chevron-down.svg"
              />
            </Listbox.Button>
            <Listbox.Options className={headerStyles.dropdownOptions}>
              {dropdownOptions.map((option, optionId) => (
                <Listbox.Option
                  key={optionId}
                  className={headerStyles.dropdownOptionWrapper}
                  value={option}
                >
                  {({ selected }) => (
                    <span className={selected ? headerStyles.dropdownOptionSelected : headerStyles.dropdownOption }>{option.name}</span>
                  )}
                  {/* <span className={''}>{option.name}</span> */}
                </Listbox.Option>
                ))}
            </Listbox.Options>
          </Listbox>
        </div>

        <div className={headerStyles.filterButton}>
          <Image
            onClick={handleFilterClick}
            height={20}
            width={20}
            src="/images/filter-toggle.svg"
          />
        </div>
      </div>
    </header>
  );
}