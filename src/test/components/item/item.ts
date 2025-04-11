import { inject } from '../../../di/utils/inject'
import { CounterService } from '../../services/counter.service'
import { BaseComponent } from '../base/base-component'

export class Item extends BaseComponent<'div'> {
  private readonly counter = inject(CounterService).counter

  constructor(private readonly name: string) {
    super({ tag: 'div', className: 'item' })
    this.updateCounter(this.counter.value)

    this.counter.subscribe(this.updateCounter.bind(this))
  }

  private updateCounter(count: number): void {
    this.setTextContent(`${this.name} ${count}`)
  }
}
