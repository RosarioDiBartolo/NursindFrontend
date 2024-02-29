import React, { useState } from 'react';

interface OperationSelectorProps {
  operations: Array<string>;
  onSelect: (operation: string) => void;
}

const OperationSelector: React.FC<OperationSelectorProps> = ({operations, onSelect }) => {
  const [selectedOperation, setSelectedOperation] = useState<string>('');

  const handleOperationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const operation = event.target.value;
    setSelectedOperation(operation);
    onSelect(operation);
  };

  return (
    <div>
      <label>Select Operation: </label>
      <select value={selectedOperation} onChange={handleOperationChange}>
        {operations.map((v, i) => <option value= {v} key={i} >{v}</option>  )}
      </select>
    </div>
  );
};

export default OperationSelector;