// import { useState} from "react";
// import type { Dispatch, SetStateAction } from "react";

// export const useSearchHistory = (HISTORY_KEY:string): [string[], Dispatch<SetStateAction<string[]>>]=>{
//     const [searchHistory, setSearchHistory] = useState<string[]>(()=>JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'));
//     return [searchHistory, setSearchHistory];
// }

import { useState, useEffect } from "react";

export const useSearchHistory = (HISTORY_KEY: string) => {
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("History parse error:", error);
      return [];
    }
  });

  // sync ลง localStorage อัตโนมัติ
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory));
  }, [searchHistory, HISTORY_KEY]);

  return [searchHistory, setSearchHistory] as const;
};