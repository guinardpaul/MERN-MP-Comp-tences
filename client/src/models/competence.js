import { cycles } from './enums';

export class Competence {
  constructor(_id, ref_ct, description_ct, domaine, sous_domaine, cycle) {
    this._id = _id;
    this.ref_ct = ref_ct;
    this.description_ct = description_ct;
    this.domaine = domaine;
    this.sous_domaine = sous_domaine;
    this.cycle = cycle;
  }
}
