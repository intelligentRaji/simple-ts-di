export class SuperDependency {
  public counter = 0

  public count() {
    console.log(`super ${this.counter++}`)
  }
}
