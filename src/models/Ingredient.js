export default class Ingredient {
  constructor(name, count) {
    this._id = "" + Math.floor(1e8 * Math.random());
    this._name = name;
    this._count = count;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get count() {
    return this._count;
  }

  set count(value) {
    this._count = value;
  }
}