import { Component } from '../di/decorators/component'
import { SecondChild } from './second-child'
import { Child } from './child'
import { SuperDependency } from './super-dependency'

@Component([SuperDependency])
export class Root {
  constructor() {
    new Child()
    new SecondChild()
  }
}
