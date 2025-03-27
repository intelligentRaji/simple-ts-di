import { Component } from '../decorators/component'
import { Dependency } from './dependency'
import { GrandChild } from './grand-child'

@Component([Dependency])
export class Asd {
  constructor() {
    new GrandChild()
  }
}
