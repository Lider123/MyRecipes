export default class Ingredient {
  constructor(name, count) {
    this._name = name;
    this._count = count;
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