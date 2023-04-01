import Link from 'next/link';
import Image from 'next/image';
import buttonStyles from '@/styles/Button.module.css';

export default function Button({ url, children }) {

  return (
    <Link
      href={url}
      target='_blank'
      className={buttonStyles.container}
    >
      {children}
      <Image
        height={18}
        width={18}
        src={'images/chevron-right.svg'}
        alt="An arrow pointing to the right"
      />
    </Link>
  );
};