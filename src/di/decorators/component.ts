import { Injector } from '../injector/injector'
import { Constructor } from '../types/constructor'
import { getCurrentInjector, INJECTOR_STACK } from '../utils/inject'

export function Component(providers: Constructor[] = []) {
  return function <T extends Constructor>(target: T) {
    return class extends target {
      constructor(...args: any[]) {
        const parent = getCurrentInjector()
        const injector = new Injector(parent, providers)
        INJECTOR_STACK.push(injector)
        super(...args)
        INJECTOR_STACK.pop()
      }
    }
  }
}
