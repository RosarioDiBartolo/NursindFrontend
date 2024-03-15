import React, { useRef } from 'react';

import { Button } from './components/ui/button';

interface Props{
    children: React.ReactNode;
    callback?: ( files: File ) => void ;
}

const FileUploader: React.FunctionComponent< Props  > = ( {children, callback} ) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelection = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles =  event.target.files  ;

    if (selectedFiles ) {
      const file = selectedFiles.item(0);
      
      if (file && callback){
        callback(  file   );
       }
    
      // Reset the value of the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
       />
      </>
  );
};

export default FileUploader;