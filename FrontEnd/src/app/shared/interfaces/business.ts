export interface business {
    name: string,
    address: string,
    mediaPieceFormat: any,
    description: string,
    openTime: string,
    closeTime: string
    _id?:string;
    averageNote?: number;
    fechaCreacion?:Date;
    id_user?:string;
};