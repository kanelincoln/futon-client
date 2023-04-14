import Image from 'next/image';

import { Listbox } from '@headlessui/react';

import hStyles from '@/styles/Header.module.css';

export default function Header({ selectedBorough, setSelectedBorough, dropdownOptions }) {
  const handleFilterClick = () => {
    console.log('Filter button has been clicked.');
  };
  
  return (
    <header className={hStyles.header}>
      <div className={hStyles.searchContainer}>
        <div className={hStyles.dropdownContainer}>
          <Listbox value={selectedBorough} onChange={setSelectedBorough}>
            <Listbox.Button className={hStyles.dropdownButton}>
              <span className={hStyles.dropdownButtonLabel}>{selectedBorough.name}</span>
              <Image
                height={18}
                width={18}
                src="/images/light-chevron-down.svg"
                alt="An icon indicating a dropdown menu"
              />
            </Listbox.Button>

            <Listbox.Options className={hStyles.dropdownOptions}>
              {dropdownOptions.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={hStyles.dropdownOptionWrapper}
                  value={option}
                >
                  {({ selected }) => (
                    <span className={selected ? hStyles.dropdownOptionSelected : hStyles.dropdownOption }>{option.name}</span>
                  )}
                </Listbox.Option>
                ))}
            </Listbox.Options>
          </Listbox>
        </div>

        <div className={hStyles.filterButton}>
          <Image
            onClick={handleFilterClick}
            height={20}
            width={20}
            src="/images/filter-toggle.svg"
            alt="An icon for filtering results"
          />
        </div>
      </div>
    </header>
  );
}