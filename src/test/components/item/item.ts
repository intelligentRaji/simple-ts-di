import './item.scss'
import { Component } from '../../../di/decorators/component'
import { inject } from '../../../di/utils/inject'
import { CounterService } from '../../services/counter.service'
import { BaseComponent } from '../base/base-component'

@Component([CounterService])
export class Item extends BaseComponent<'div'> {
  private readonly counter = inject(CounterService)

  constructor(private readonly name: string) {
    super({ tag: 'div', className: 'item' })

    const text = new BaseComponent({
      tag: 'span',
      text: `${this.name} ${this.counter.counter.value}`,
    })

    const button = new BaseComponent({
      tag: 'button',
      text: 'Count',
    })

    button.addListener('click', () => {
      this.counter.increment()
    })

    this.append(text, button)

    this.counter.counter.subscribe((count) => {
      text.setTextContent(`${this.name} ${count}`)
    })
  }
}
