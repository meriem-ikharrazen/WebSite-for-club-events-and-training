// export class Ef {
//     id:bigint;
//     id_formation:bigint;
//     date_inscription:Date;
// }

import { Formation } from "./formation.model";
import { User } from "./user.model";

export class Ef {
    etudiant:User;
    formation:Formation;
    date_inscription:Date;
}
