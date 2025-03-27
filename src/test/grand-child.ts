import { Component } from '../decorators/component'
import { inject } from '../utils/inject'
import { Dependency } from './dependency'
import { SuperDependency } from './super-dependency'

@Component()
export class GrandChild {
  private readonly superDep = inject(SuperDependency)
  private readonly dep = inject(Dependency)

  constructor() {
    this.superDep.count()
    this.dep.count()
  }
}
