import React, { useRef } from 'react';

import { Button } from './components/ui/button';

interface Props{
    children: React.ReactNode;
    callback?: ( files: FileList ) => void ;
}

const FileUploader: React.FunctionComponent< Props  > = ( {children, callback} ) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelection = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      // Handle the selected files (in this case, assuming PDFs)
      if (callback){
        callback(selectedFiles)
      } 
      console.log('Selected files:', selectedFiles);
    }
  };

  return (
    <> 
      <Button onClick={handleFileSelection}>{children}</Button>
      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple
      />
      </>
  );
};

export default FileUploader;