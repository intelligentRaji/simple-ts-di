import { Observable } from '../utils/observable'

export class CounterService {
  public readonly counter = new Observable(0)

  public increment(): void {
    this.counter.update((value) => value + 1)
  }
}
