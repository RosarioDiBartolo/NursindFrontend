
export class Api{
    endpoint: string;
    constructor(endpoint: string){
        this.endpoint = endpoint;
    }

    async fetch(route: string | URL, data: RequestInit | undefined): Promise<Response> {
        const response = await fetch(this.path(route), data);
      
        if (!response.ok) {
          throw new Error(`Error fetching data. Status: ${response.status}`);
        }
      
        return response;
      }

    path(route: string | URL  ){
        return new URL(route,  this.endpoint)
    }
}


 

