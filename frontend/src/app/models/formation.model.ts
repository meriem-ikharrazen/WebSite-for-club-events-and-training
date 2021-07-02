import { Categorie } from "./categorie.model";
import { Club } from "./club.model";

export class Formation {

    id:bigint;
    date_debut:Date;
    date_fin:Date;
    description:Text;
    image:string;
    libele:string;
    categorie:Categorie;
    club:Club;
    status:boolean
}
