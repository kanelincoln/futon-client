import Link from 'next/link';
import Image from 'next/image';

import buttonStyles from '@/styles/Button.module.css';

export default function Button({ type, url, children, secondary }) {
  if (!url) {
    return (
    <button
      type={type}
      className={secondary ? buttonStyles.containerSecondary : buttonStyles.containerPrimary}
      >
        {children}
      <Image
        height={18}
        width={18}
        src={secondary ? 'images/light-chevron-right.svg' : 'images/dark-chevron-right.svg'}
        alt="An arrow pointing to the right"
      />
    </button>
    );
  } else {
    return (
      <Link
        href={url}
        target='_blank'
        className={secondary ? buttonStyles.containerSecondary : buttonStyles.containerPrimary}
      >
        {children}
        <Image
          height={18}
          width={18}
          src={secondary ? 'images/light-chevron-right.svg' : 'images/dark-chevron-right.svg'}
          alt="An arrow pointing to the right"
        />
      </Link>
    );
  }
};