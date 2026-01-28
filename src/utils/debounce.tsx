import { useRef, useCallback } from 'react';

const useDebounce = <T extends (...args: Parameters<T>) => void>(callback: T, delay: number) => {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    const callbackRef = useRef(callback);
    callbackRef.current = callback; 

    const debouncedFunction = useCallback((...args: Parameters<T>) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            callbackRef.current(...args);
        }, delay);
    }, [delay]);

    return debouncedFunction;
};

export default useDebounce;