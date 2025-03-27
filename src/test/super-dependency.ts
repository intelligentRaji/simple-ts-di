export class SuperDependency {
  public counter = 0

  public count() {
    console.log(`super-dependency ${this.counter++}`)
  }
}
