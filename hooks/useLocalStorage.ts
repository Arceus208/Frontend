import { useEffect, useState, useRef } from "react";

export function useLocalStorage<T>() {
  const [value, setValue] = useState<T[]>([]);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    localStorage.setItem("mycart", JSON.stringify(value));
  }, [value]);

  useEffect(() => {
    const jsonValue = localStorage.getItem("mycart");

    if (jsonValue != null) {
      setValue(JSON.parse(jsonValue));
    }
  }, []);

  return [value, setValue] as [typeof value, typeof setValue];
}
