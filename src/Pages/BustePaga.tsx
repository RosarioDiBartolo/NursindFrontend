import { Button } from "@/components/ui/button";
import { TableBody, TableRow , Table, TableCell} from "@/components/ui/table";
 
 
const BustePaga = () => {
  return (
    <div>
      <Table>
        <TableBody>
          <TableRow><TableCell>Utente</TableCell>  </TableRow>
         </TableBody>
      </Table>

      <Button className=" ">Aggiungi utente</Button>
    </div>
   );
};

export default BustePaga;
