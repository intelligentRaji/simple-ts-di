import './item.scss'
import { Component } from '../../../di/decorators/component'
import { inject } from '../../../di/inject'
import { CounterService } from '../../services/counter.service'
import { BaseComponent } from '../base/base-component'
import { InjectionToken } from '../../../di/injection-token'
import { ROOT_TOKEN } from '../../tokens/root-token'

const TEST = new InjectionToken('TEST')

@Component([CounterService, { provide: TEST, useExisting: CounterService }])
export class Item extends BaseComponent<'div'> {
  private readonly counter = inject<CounterService>(TEST)
  private readonly rootToken = inject(ROOT_TOKEN)

  constructor(private readonly name: string) {
    super({ tag: 'div', className: 'item' })
    console.log(this.rootToken)

    const text = new BaseComponent({
      tag: 'span',
      text: `${this.counter.counter.value}`,
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
