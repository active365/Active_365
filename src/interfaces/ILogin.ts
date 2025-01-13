export interface ILoginData  {
    email: string;
    password: string;
}

export interface ILoginErrors {
    email?: string;
    password?: string;
}

export interface IUserSession{
    token:string;
    user: {
        address: string;
        credential:{
            id:number;
            password:string
        }
        email: string;
        id: number
        name: string;
        orders: number[]
        phone: string;
        role: string;
    }
}