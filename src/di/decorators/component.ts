import { Injector } from '../injector/injector'
import { Constructor } from '../types/constructor'
import { getCurrentInjector, setCurrentInjector } from '../utils/context'

export function Component(providers: Constructor[] = []) {
  return function <T extends Constructor>(target: T) {
    return class extends target {
      constructor(...args: any[]) {
        const parent = getCurrentInjector()
        const injector = new Injector(parent, providers)
        setCurrentInjector(injector)
        super(...args)
        setCurrentInjector(parent)
      }
    }
  }
}
