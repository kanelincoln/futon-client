import Image from 'next/image';
import Link from 'next/link';

import { Listbox } from '@headlessui/react';

import hStyles from '@/styles/Header.module.css';

export default function Header({ selectedBorough, setSelectedBorough, dropdownOptions }) {
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

        <Link href="mailto:hello@tryfuton.com">
          <div className={hStyles.button}>
            <Image
              height={18}
              width={18}
              src="/images/mail.svg"
              alt="An icon for submitting feedback or getting in touch"
              />
          </div>
        </Link>

        <Link href="https://airtable.com/shrHAb9mA5GASYH4D" target="_blank">
          <div className={hStyles.button}>
            <Image
              height={16}
              width={16}
              src="/images/plus.svg"
              alt="An icon for adding a space"
              />
          </div>
        </Link>
      </div>
    </header>
  );
}