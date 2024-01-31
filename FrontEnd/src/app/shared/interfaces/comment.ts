import { Negocios } from "./negocios";
import { Usuarios } from "./usuarios";

export interface Comment {
    _id?:string;
    userId?:Usuarios[];
    comment?:string;
    response?:string;
    negocioId?:Negocios[];
    negocioName?:string;
    fechaCreacion?:Date;
}
