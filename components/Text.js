import textStyles from '@/styles/Text.module.css';

export function Title({ children }) {
  return (<h1 className={textStyles.title}>{children}</h1>);
};

export function Subtitle({ children }) {
  return (<h2 className={textStyles.subtitle}>{children}</h2>);
};

export function RowTitle({ children }) {
  return (<p className={textStyles.rowTitle}>{children}</p>);
};

export function Body ({ children }) {
  return (<p className={textStyles.body}>{children}</p>);
};

export default {
  Title,
  Subtitle,
  RowTitle,
  Body
};