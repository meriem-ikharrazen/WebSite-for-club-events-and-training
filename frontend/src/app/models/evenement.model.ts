import { Club } from "./club.model";

export class Evenement {
    id:bigint;
    data_ajout:string;
    data_fin:string;
    description:string;
    image:string;
    libele:string;
    status:boolean;
    club:Club;
}
