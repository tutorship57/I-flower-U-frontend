import { useState} from "react";
import type { Dispatch, SetStateAction } from "react";

export const useSearchHistory = (HISTORY_KEY:string): [string[], Dispatch<SetStateAction<string[]>>]=>{
    const [searchHistory, setSearchHistory] = useState<string[]>(()=>JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'));
    return [searchHistory, setSearchHistory];
}