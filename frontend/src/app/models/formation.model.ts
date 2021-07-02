import { Categorie } from "./categorie.model";
import { Club } from "./club.model";
import { Formateur } from "./formateur.model";

export class Formation {

    id:bigint;
    date_debut:Date;
    date_fin:Date;
    description:Text;
    image:string;
    libele:string;
    categorie:Categorie;
    club:Club;
    formateur:Formateur;
    status:boolean
}
