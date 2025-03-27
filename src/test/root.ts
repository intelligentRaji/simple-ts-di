import { BaseComponent } from '../base-component/base-component'
import { Component } from '../decorators/component'
import { inject } from '../utils/inject'
import { Child } from './child'
import { Dependency } from './dependency'

@Component()
export class Root extends BaseComponent<'div'> {
  private readonly dep = inject(Dependency)

  constructor() {
    super({})
    console.log(`root component dependency is ${this.dep}`)
    this.append(new Child())
  }
}
