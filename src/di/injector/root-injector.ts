import { Injector } from './injector'

export class RootInjector extends Injector {
  constructor() {
    super(null, [])
  }
}
