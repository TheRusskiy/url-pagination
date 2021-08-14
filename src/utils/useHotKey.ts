import { useEffect, useRef } from 'react';

type Key = 'ArrowLeft' | 'ArrowRight' | 'PageUp' | 'PageDown';

const noop = () => {};

export default function useHotKey(
  key: Key | Key[],
  callback: () => unknown = noop,
  enabled: boolean = true
) {
  const callbackRef = useRef<() => void>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!enabled) return;

    const listener = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).nodeName === 'INPUT') return;
      if (([key].flat() as string[]).includes(event.code)) {
        if (callbackRef.current) {
          callbackRef.current();
        }
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [key, enabled]);
}
