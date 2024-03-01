import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import FileUploader from "../FileUploader";

import { useCallback, useState } from "react";

import { saveAs } from "file-saver";

import { Operations } from "../Global";
import OperationSelector from "../OperationSelector";
import { backend } from "@/config";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "../config";

import PDFBlock from "../application/PDFBlock";
import OCRExtractor from "@/application/OCRExtractor";

interface HomeProps {}

function Home({}: HomeProps) {
  const [selectedOperation, setSelectedOperation] = useState<string>(
    Operations[0]
  );

  const save = async (files: FileList) => {
    const formData = new FormData();
    // Append each selected file to the FormData object
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    // Make a POST request using fetch
    const response = await backend.fetch("/analyze", {
      method: "POST",
      body: formData,
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
    });

    // Check the response status
    if (response.ok) {
      const blob = await response.blob();
      console.log("Files uploaded successfully");
      const contentDisposition = response.headers.get("content-disposition");
      let filename = "result.zip";
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"$/);
        filename = match ? match[1] : filename;
      }

      // Save the zip file using FileSaver.js
      saveAs(blob, filename);
    } else {
      console.error("Failed to upload files");
      console.log(await response.text());
    }
  };

  const analyze = useCallback(async (files: FileList) => {
    const block = new PDFBlock(files);
    const extractor = new OCRExtractor();
    for (let index = 0; index < files.length; index++) {
      const doc = await block.getFile(index);
      if (doc) {
        const doc_features = await extractor.features(doc);
      }
    }
  }, []);
  return (
    <>
      <div className="flex flex-row justify-content-between">
        <Button onClick={() => signOut(auth)}>Logout</Button>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Worker-Analyzer</h1>
      <div className="card default">
        <p className="">
          Comincia l'analisi dei pdf di dipendenti di diverse aziende
          nell'ambito sanitario <code>src/App.tsx</code>
        </p>

        <FileUploader callback={analyze}>Comincia da qui</FileUploader>
      </div>
      <div className="select-container">
        <p className="default">{selectedOperation}</p>
        <OperationSelector
          operations={Operations}
          onSelect={setSelectedOperation}
        />
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default Home;
