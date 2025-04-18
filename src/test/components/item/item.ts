import './item.scss'
import { Component } from '../../../di/decorators/component'
import { inject } from '../../../di/inject'
import { CounterService } from '../../services/counter.service'
import { BaseComponent } from '../base/base-component'
import { InjectionToken } from '../../../di/injection-token'
import { ROOT_TOKEN } from '../../tokens/root-token'
import { NOT_PROVIDED_TOKEN } from '../../tokens/not-provided-token'

const TEST = new InjectionToken<string>('TEST')

@Component([{ provide: TEST, useValue: 'test' }])
export class Item extends BaseComponent<'div'> {
  private readonly counter = inject(CounterService, { host: true })
  private readonly test = inject(TEST)
  private readonly rootToken = inject(ROOT_TOKEN)
  private readonly notProvided = inject(NOT_PROVIDED_TOKEN, { optional: true })

  constructor(private readonly name: string) {
    super({ tag: 'div', className: 'item' })
    console.log(this.rootToken)
    console.log(this.notProvided)

    const text = new BaseComponent({
      tag: 'span',
      text: `${this.test} ${this.counter.counter.value}`,
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
      text.setTextContent(`${this.test} ${this.name} ${count}`)
    })
  }
}
