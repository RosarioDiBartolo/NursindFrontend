import {    UserCircle   } from "lucide-react";
import { IoIosSettings  } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/config";
import { useState } from "react";

function UserAccordition() {

  return (
    <AccordionItem value="User">
      <AccordionTrigger className=" "><span className="flex gap-3"><UserCircle className='no-rot' /><span>Utente</span>    </span>      </AccordionTrigger>
      <AccordionContent className="bg-slate-100 rounded-md p-3"><Button onClick={() => signOut(auth)} variant="link" className='hover:text-red-700 deco'  >Logout</Button>  </AccordionContent>
    </AccordionItem>
  );
}


function conditional_class( base: string  ,   value: boolean,  ifTrue: string, Else: string = ""   ){
  return `${base} ${value ? ifTrue : Else}`
}


function Sidebar() {
  const [expand, setExpand] = useState<boolean>(false);
  const triggerExpand = ()=>{
    setExpand(prev => !prev)
  }
  return (
    <div className= {conditional_class(  "border bg-white p-3 w-[400px] text-start shadow-md shadow-slate-600", expand, "h-full", "h-fit" )}>
      <h1 className="text-2xl font-bold flex items-center gap-3" onClick={triggerExpand }>
        {(expand ? <IoIosSettings className=" " /> : <IoSettingsOutline/> )}Impostazioni
      </h1>

      <div className="text-md my-5 font-sans">Generali</div>

      <div>
        <Accordion type="single" collapsible>
          <UserAccordition />
          <AccordionItem value="item-2">
            <AccordionTrigger>Utente Is it accessible?</AccordionTrigger>
            <AccordionContent className="bg-slate-100 rounded-md p-3">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Utente Is it accessible?</AccordionTrigger>
            <AccordionContent className="bg-slate-100 rounded-md p-3">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default Sidebar;
