import { cycles } from "./enums";

export function Competence() {
  this._id = 0;
  this.ref_ct = '';
  this.description_ct = '';
  this.domaine = 0;
  this.sous_domaine = '';
  this.cycle = cycles;
};
