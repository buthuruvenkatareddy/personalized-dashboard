import debounce from 'lodash.debounce';
import { useMemo, useEffect } from 'react';

export const useDebouncedCallback = (
  callback: (...args: any[]) => void,
  delay: number = 500
) => {
  const debounced = useMemo(() => debounce(callback, delay), [callback, delay]);

  useEffect(() => {
    return () => debounced.cancel(); // ✅ Cleanup on unmount
  }, [debounced]);

  return debounced;
};
