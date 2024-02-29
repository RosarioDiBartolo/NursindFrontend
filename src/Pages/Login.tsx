
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRef , useState} from 'react';
 
import { backend } from '@/config';

export function Login() {
  const [State, setState] = useState("Immetti le tue credenziali per aver accesso alla piattaforma.")
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const signIn = useSignIn();
  const navigate = useNavigate();

  const login = async ()=>{
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await backend.fetch("/login",  {method: "POST", headers: {
      'Content-Type': 'application/json',
  },     body: JSON.stringify({ email, password  })});

    if (response.status === 401){
      setState("Invalid Credentials")
      return
    }
    const data =  await response.json() 
    console.log(data)
    if (  signIn( data)){
      setState("Succesfully logged in!")
      navigate("/");

    }

  
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Accedi al tuo Account</CardTitle>
        <CardDescription> {State}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email:</Label>
              <Input ref={emailRef} id="email" placeholder="La tua Email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password:</Label>
              <Input ref={passwordRef} type="password" id="password" placeholder="password del tuo account" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Tipo Utente">Tipo Utente:</Label>
              <Select defaultValue="Admin">
                <SelectTrigger id="Tipo Utente">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Contributore">Contributore</SelectItem>
                  <SelectItem value="Esterno">Esterno</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={login}>Accedi</Button>
      </CardFooter>
    </Card>
  )
}

export default Login;