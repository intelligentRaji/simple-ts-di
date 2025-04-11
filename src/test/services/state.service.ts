import { Observable } from '../utils/observable'

export class StateService {
  public readonly items = new Observable<string[]>([])

  public addItem(item: string): void {
    this.items.update((items) => [...items, item])
  }

  public removeItem(item: string): void {
    this.items.update((items) => items.filter((i) => i !== item))
  }
}
