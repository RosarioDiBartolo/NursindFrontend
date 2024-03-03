import { createContext, useContext, Dispatch, SetStateAction } from "react";

export interface Group {
  Missing: number;
  Mattine: number;
  Pomeriggi: number;
  Notti: number;
  Nomi: string[];
}

interface GroupContextProps {
  BlockState: Group;
  setBlockState: Dispatch<SetStateAction<Group>>;
}

export const GroupContext = createContext<GroupContextProps | undefined>(undefined);

export const useGroupData = (): GroupContextProps => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroupData must be used within a GroupContext Provider");
  }
  return context;
};