import { Formation } from "./formation.model";

export class Content {
    id:BigInteger;
    description:Text;
    nom:string;
    url:string;
    formation:Formation;
}
