export default function User() {
  this.id = "" + Math.floor(1e8 * Math.random());
  this.favourites = [];
}