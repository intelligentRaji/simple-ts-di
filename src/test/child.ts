import { Component } from '../di/decorators/component'
import { Dependency } from './dependency'
import { GrandChild } from './grand-child'

@Component([Dependency])
export class Child {
  constructor() {
    new GrandChild()
  }
}
