import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
 
import {   useState  } from 'react'
 

import { Operations } from '@/config';
import OperationSelector from '../OperationSelector'
import { Button } from '@/components/ui/button';
import {signOut} from 'firebase/auth'
import {auth} from '../config'
import Tasks from '@/Tasks';
  
function Home(  ) {
    const [selectedOperation, setSelectedOperation] = useState<string>(Operations[0]);

 
  return (
<>
      <div className='flex flex-row justify-content-between'>
        <Button onClick={() =>signOut(auth)}>
          Logout
        </Button>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Worker-Analyzer</h1>
      <div className="card default">
        
        <p className=''>
          Comincia l'analisi dei pdf di dipendenti di diverse aziende nell'ambito sanitario <code>src/App.tsx</code> 
        </p>
         

         
       </div>
       <div className="select-container">
       <p className='default'>
        {selectedOperation}  
      </p>
       <OperationSelector operations={Operations}  onSelect={setSelectedOperation } />
      </div>
       
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Tasks />
    </>  )
}

export default Home