import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { CheckCheck, FileX2 } from "lucide-react";

export type AuthStatusType = "success" | "loading" | "error";


 
export const statusOptions = {
    
  success: <CheckCheck className='text-green-600' />,

  error: <FileX2 className="text-red-500" onClick={()=>{

    
  }}/>,

  loading: <LoadingSpinner className="text-gray" />

}

export interface AuthStatusInfo{type: AuthStatusType; message: string }