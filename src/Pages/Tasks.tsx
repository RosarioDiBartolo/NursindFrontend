// Import necessary libraries
import { useState } from "react";
import FileUploader from "../FileUploader";
import  Block from "../components/Widgets/Block";
 

// Main TasksPage component
function Tasks() {
  const [blocks, setBlocks] = useState<File[]>([]);
  console.log(blocks);
  return (
    <div className="flex flex-col w-full">
      {blocks.length > 0 ? (
        blocks.map((block, idx) => <Block key={idx} Block={block} />)
      ) : (
        <h3 className="text-slate-600 rounded-sm p-6 text-opacity-90 ">
          Comincia l'analisi dei pdf di dipendenti di diverse aziende
          nell'ambito sanitario: <code>Azienda Pisa</code>
        </h3>
      )}
      <footer className="flex justify-end w-[100%] my-6 ">
        <FileUploader
          callback={(file) => {
            setBlocks([...blocks, file]);
          }}
        >
          Aggiungi analisi ...
        </FileUploader>
      </footer>
    </div>
  );
}

export default Tasks;
