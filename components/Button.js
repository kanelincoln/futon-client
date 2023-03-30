import Link from 'next/link';
import Image from 'next/image';
import buttonStyles from '@/styles/Button.module.css';

export default function Button({ url, secondary, children }) {

  return (
    <Link
      href={url}
      target={secondary ? '_blank' : null}
      className={secondary ? buttonStyles.secondary : buttonStyles.primary}
    >
      {children}
      <Image
        height={18}
        width={18}
        src={secondary ? 'images/light-chevron-right.svg' : 'images/chevron-right.svg'}
        alt="An arrow pointing to the right"
      />
    </Link>
  );
};