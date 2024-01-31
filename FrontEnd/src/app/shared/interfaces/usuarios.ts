export interface Usuarios {
    _id?:string;
    bName?: string;
    email?: string;
    userType?: string;
    negocios?: Array<string>;
    status?:string;
    fechaCreacion?:string;
}
