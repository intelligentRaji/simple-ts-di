import './app.scss'
import { Component } from '../../../di/decorators/component'
import { BaseComponent } from '../base/base-component'
import { CounterService } from '../../services/counter.service'
import { StateService } from '../../services/state.service'
import { inject } from '../../../di/utils/inject'
import { Item } from '../item/item'
import { dynamicComponent } from '../../../di/utils/dynamic-component'
import { Injector } from '../../../di/injector/injector'

@Component([CounterService])
export class AppComponent extends BaseComponent<'div'> {
  private readonly state = inject(StateService)
  private readonly counter = inject(CounterService)
  private readonly injector = inject(Injector)

  private readonly itemsContainer = new BaseComponent({
    tag: 'div',
    className: 'items',
  })

  constructor() {
    super({ tag: 'div', className: 'root' })

    const input = new BaseComponent({
      tag: 'input',
      className: 'input',
    })

    const add = new BaseComponent({
      tag: 'button',
      text: 'Add',
    })

    add.addListener('click', () => {
      this.state.addItem(input.node.value)
      input.node.value = ''
    })

    const increment = new BaseComponent({
      tag: 'button',
      text: 'Increment',
    })

    const globalCounter = new BaseComponent({
      tag: 'span',
      text: `${this.counter.counter.value}`,
      className: 'global-counter',
    })

    increment.addListener('click', () => {
      this.counter.increment()
    })

    this.append(input, add, increment, this.itemsContainer, globalCounter)

    this.counter.counter.subscribe((count) => {
      globalCounter.setTextContent(`${count}`)
    })
    this.state.items.subscribe(this.createItems.bind(this))
  }

  private createItems(items: string[]): void {
    this.itemsContainer.destroyChildren()
    items.forEach((name) => {
      this.itemsContainer.append(dynamicComponent(Item, [name], this.injector))
    })
  }
}
