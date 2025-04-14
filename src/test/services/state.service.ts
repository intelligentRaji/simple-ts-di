import { Injectable } from '../../di/decorators/injectable'
import { Observable } from '../utils/observable'

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public readonly items = new Observable<string[]>([])

  public addItem(item: string): void {
    this.items.update((items) => [...items, item])
  }

  public removeItem(item: string): void {
    this.items.update((items) => items.filter((i) => i !== item))
  }
}
