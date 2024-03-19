import { Settings,   UserCircle   } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { signOut } from "firebase/auth";

function UserAccordition() {

  return (
    <AccordionItem value="User">
      <AccordionTrigger className="justify-start gap-3"><UserCircle className='no-rot' /> <span>Utente</span>       </AccordionTrigger>
      <AccordionContent className="bg-slate-100 rounded-md p-3"><Button onClick={signOut} variant="link" className='hover:text-red-700 deco'  >Logout</Button>  </AccordionContent>
    </AccordionItem>
  );
}

function Sidebar() {
  return (
    <div className="border bg-white p-3 w-[400px] text-start shadow-md shadow-slate-600">
      <h1 className="text-2xl font-bold ">
        <Settings className="inline" /> Impostazioni
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
