import React
//, { createContext, useState } 
from "react";

interface MapProps<T> {
  Arr: Array<T>;
  Comp: React.FC<T>;
}

const Map = <T,>({ Arr, Comp }: MapProps<T>) => {
  return (
    <>
      {Arr.map((props, index) => (
        <Comp key={index} {...props} />
      ))}
    </>
  );
};

// export const TrackContext = createContext<[unknown[], (obj: unknown) => void]>([[], () => {}]);

// export function Track<T >({ Comp }: { Comp: React.FC<T> }) {
//   const [objects, setObjects] = useState<T[]>([]);

//   const update = (obj:  T ) => setObjects(prev => [...prev, obj]);

//   return (
//     <TrackContext.Provider value={[objects, update]}>
//       <Map Arr={objects} Comp={Comp} />
//     </TrackContext.Provider>
//   );
// }

export default Map;