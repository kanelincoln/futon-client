import { useEffect, useState } from 'react';
import Image from 'next/image';
import Text from '@/components/Text';
import expandableRowStyles from '@/styles/ExpandableRow.module.css';

export default function ExpandableRow({ contentWhenCollapsed, children }) {
  const [expanded, setExpanded] = useState(false);

  const generateContent = () => {
    if (!expanded) return <Text.P>{contentWhenCollapsed}</Text.P>;
    return <div>{children}</div>;
  };

  return (
    <div
      className={expanded ? expandableRowStyles.expanded : expandableRowStyles.collapsed}
      onClick={() => expanded ? setExpanded(false) : setExpanded(true)}
    >
      {generateContent()}

      <Image
        height={16}
        width={16}
        src='/images/grey-chevron-up.svg'
        alt={`An arrow pointing ${expanded ? 'up' : 'down'}`}
      />
    </div>
  );
};