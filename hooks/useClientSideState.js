import { useState, useEffect } from 'react';

function useClientSideState(key, defaultValue) {
  const [state, setState] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? storedValue : defaultValue;
    }

    return defaultValue;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (state === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, state);
      }
    }
  }, [key, state]);

  return [state, setState];
};

export default useClientSideState;