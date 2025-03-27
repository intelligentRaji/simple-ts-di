import { Component } from '../di/decorators/component'
import { inject } from '../di/utils/inject'
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
