import { Settings  } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
function Sidebar() {
  return (
    <div className="border bg-white p-3 w-[400px] text-start shadow-md shadow-slate-600">
      <h1 className="text-2xl font-bold ">
        <Settings className="inline" /> Impostazioni
      </h1>

      <div className="text-md my-5 font-sans">Generali</div>

      <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" >
            <AccordionTrigger>
                Utente Is it accessible? 
            </AccordionTrigger>
            <AccordionContent className='bg-slate-100 rounded-md p-3'>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" >
            <AccordionTrigger>
                Utente Is it accessible? 
            </AccordionTrigger>
            <AccordionContent className='bg-slate-100 rounded-md p-3'>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" >
            <AccordionTrigger>
                Utente Is it accessible? 
            </AccordionTrigger>
            <AccordionContent className='bg-slate-100 rounded-md p-3'>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default Sidebar;
