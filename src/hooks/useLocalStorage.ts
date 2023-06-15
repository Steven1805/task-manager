import { useState, useEffect } from "react";

type ValueSetter<T> = (value: T) => void;

const useLocalStorage = <T>(key: string, initialValue: T): [T, ValueSetter<T>] => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export { useLocalStorage };
