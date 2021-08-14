import { useEffect, useRef } from 'react';

type Key = 'ArrowLeft' | 'ArrowRight';

const noop = () => {}

export default function useHotKey(key: Key, callback: () => unknown = noop, enabled: boolean = true) {
  const callbackRef = useRef<() => void>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!enabled) return

      const listener = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).nodeName === 'INPUT') return;
      if (event.code === key) {
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
