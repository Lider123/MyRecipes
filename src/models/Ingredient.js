export default function Ingredient(name, count) {
  this.id = "" + Math.floor(1e8 * Math.random());
  this.name = name;
  this.count = count;
}
