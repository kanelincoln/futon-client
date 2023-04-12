import { Listbox } from '@headlessui/react';
import Image from 'next/image';
import headerStyles from '@/styles/Header.module.css';

export default function Header({ selectedBorough, setSelectedBorough, dropdownOptions }) {
  // To do:
  // – Only show boroughs that have a space associated with them (e.g. if no spaces exist in Barnet, hide from dropdown).
  // – Add function to automatically locate user and set the dropdown to the relevant location.

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
                src="/images/light-chevron-down.svg"
                alt="An icon indicating a dropdown menu"
              />
            </Listbox.Button>

            <Listbox.Options className={headerStyles.dropdownOptions}>
              {dropdownOptions.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={headerStyles.dropdownOptionWrapper}
                  value={option}
                >
                  {({ selected }) => (
                    <span className={selected ? headerStyles.dropdownOptionSelected : headerStyles.dropdownOption }>{option.name}</span>
                  )}
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
            alt="An icon for filtering results"
          />
        </div>
      </div>
    </header>
  );
}