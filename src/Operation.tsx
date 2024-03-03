import   {    useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./components/ui/button";

import SpinningWheel from "./components/ui/SpinningWheel";

interface operation {
  files: string[];
}

function Operation({ files }: operation) {
  const [{loading, answer} ] = useState({
    loading: true, 
    answer: null,
  });

  

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Richiesta PDF...</CardTitle>
        <CardDescription>
        {files}        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-semibold text-gray">{loading? <SpinningWheel /> : answer} </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="text-red-500 border-red-500 focus:outline-none hover:bg-red-500 hover:text-white " variant="outline">
          Elimina
        </Button> 
      </CardFooter>
    </Card>
  );
}

export default Operation;
