import { Club } from "./club.model";

export class Evenement {
    id:bigint;
    data_ajout:Date;
    data_fin:Date;
    description:string;
    image:string;
    libele:string;
    status:boolean;
    club:Club;
}
