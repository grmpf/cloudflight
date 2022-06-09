import { useState, useCallback } from 'react';

export default function useStateWithCallback(initialValue) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle];
}