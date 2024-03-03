import { createContext, useContext  } from "react";

export interface Group{

    Missing: number;

    Mattine  :number;
    
    Pomeriggi :number;
    
    Notti  :number;

    Nomi : string[];

}
 
export const GroupContext = createContext<{ BlockState : Group , setBlockState  : React.Dispatch<React.SetStateAction<Group> > } >
(
    null 
);


export const useGroupData = ()=>{
    
    return useContext(GroupContext);
 
}