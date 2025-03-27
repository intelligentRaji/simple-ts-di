import { BaseComponent } from '../base-component/base-component'
import { Component } from '../decorators/component'
import { inject } from '../utils/inject'
import { Dependency } from './dependency'

@Component()
export class Child extends BaseComponent<'div'> {
  private readonly dep = inject(Dependency)

  constructor() {
    super({})
    console.log(`child component dependency is ${this.dep}`)
  }
}
