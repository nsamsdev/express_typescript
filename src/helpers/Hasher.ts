

import bcrypt from "bcryptjs";

export default class Hasher {

  private _data: string;
  private _hash : string;
  constructor(data : string, hashNow : boolean = true) {
    this._data = data;
    if (hashNow) {
      this._hash = bcrypt.hashSync(this._data, bcrypt.genSaltSync(10));
    } else {
      this._hash = '';
    }
  }

  getHash() {
    return this._hash;
  }

  validateHashMatch(hash : string) {
    return bcrypt.compareSync(this._data, hash);
  }
}
