import { Club } from "./club.model";

export class Evenement {
    id:bigint;
    dateAjout:string;
    dateFin:string;
    description:string;
    image:string;
    libele:string;
    status:boolean;
    club:Club;
}
