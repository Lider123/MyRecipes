export default class Recipe {
  constructor() {
    this._id = "";
    this._title = "";
    this._ingredients = [];
    this._text = ""
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get ingredients() {
    return this._ingredients;
  }

  set ingredients(value) {
    this._ingredients = value;
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
  }
}