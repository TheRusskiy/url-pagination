import { useEffect, useRef } from 'react';

export default function useDidMount(): boolean {
  const didMount = useRef(false);

  useEffect(() => {
    didMount.current = true;
  }, []);

  return didMount.current;
}
