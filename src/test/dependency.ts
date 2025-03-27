export class Dependency {
  public counter = 0

  public count() {
    console.log(`dependency ${this.counter++}`)
  }
}
