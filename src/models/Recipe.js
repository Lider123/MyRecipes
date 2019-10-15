export default function Recipe() {
  this.id = "" + Math.floor(1e8 * Math.random());
  this.author = "";
  this.title = "";
  this.ingredients = [];
  this.photo = "";
  this.text = ""
}
