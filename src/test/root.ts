import { BaseComponent } from '../base-component/base-component'
import { Component } from '../decorators/component'
import { Asd } from './asd'
import { Child } from './child'
import { SuperDependency } from './super-dependency'

@Component([SuperDependency])
export class Root extends BaseComponent<'div'> {
  constructor() {
    super({})
    new Child()
    new Asd()
  }
}
