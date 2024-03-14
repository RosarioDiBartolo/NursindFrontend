import { createContext, useContext   } from "react";
import { DateRange } from "react-day-picker";

export const DateContext = createContext<[DateRange, React.Dispatch<React.SetStateAction<DateRange>>]>([{ from: new Date() }, () => {}]);

export const useSelectedDate = () => useContext(DateContext);
