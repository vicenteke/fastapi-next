"use client";

import { useState } from "react";

/* Description: hook that abstracts the debouncer behaviour.
 * Props:
 * - delay?: interval in ms for debouncing;
 * 
 * Example: creating a debounced seach method
 *  const debounce = useDebounce(200);
 *  ...
 *  const onSearch = (search: string) => {
 *    debounce(() => {
 *     myData.filter((item) => item.includes(search));
 *    })
 *  }
 */
const useDebounce = (delay: number = 300) => {
  const [timer, setTimer] = useState<any>(null);

  const debounce = (callback: () => void) => {
      clearTimeout(timer);
      if (timer)
        clearTimeout(timer);
      setTimer(setTimeout(() => {
        callback();
      }, delay));
  }

  return debounce
}

export default useDebounce
