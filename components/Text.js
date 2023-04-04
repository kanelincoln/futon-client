import textStyles from '@/styles/Text.module.css';

export function H1({ children, className }) {
  return <h1 className={!className ? textStyles.h1 : [textStyles.h1, className].join(' ')}>{ children }</h1>;
};

export function H2({ children, className }) {
  return <h2 className={!className ? textStyles.h2 : [textStyles.h2, className].join(' ')}>{ children }</h2>;
};

export function P({ children, className }) {
return <p className={!className ? textStyles.p : [textStyles.p, className].join(' ')} >{ children }</p>;
};

export default {
  H1,
  H2,
  P,
};