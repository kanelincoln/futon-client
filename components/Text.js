import textStyles from '@/styles/Text.module.css';

export function H1({ children }) {
  return <h1 className={textStyles.h1}>{ children }</h1>;
};

export function H2({ children }) {
  return <h2 className={textStyles.h2}>{ children }</h2>;
};

export function P({ customStyles, children }) {
  return <p className={textStyles.p} style={customStyles}>{ children }</p>;
};

export default {
  H1,
  H2,
  P,
};