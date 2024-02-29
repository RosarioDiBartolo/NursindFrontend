
export class Api{
    endpoint: string;
    constructor(endpoint: string){
        this.endpoint = endpoint;
    }

    fetch(route: string | URL, data: RequestInit | undefined ){
        return fetch( this.path( route) , data )
    }

    path(route: string | URL  ){
        return new URL(route,  this.endpoint)
    }
}


 

