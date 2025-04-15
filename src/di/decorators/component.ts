import { Injector } from '../injector/injector'
import { Constructor } from '../types/constructor'
import { getCurrentInjector, setCurrentInjector } from '../context'
import { InjectionToken } from '../injection-token'
import { COMPONENT } from '../tokens'
import { Provider } from '../types/provider'

export function Component(providers: Provider<any>[] = []) {
  return function <T extends Constructor>(target: T) {
    return class extends target {
      constructor(...args: any[]) {
        const parent = getCurrentInjector()
        const injector = new Injector(parent, providers)
        setCurrentInjector(injector)
        super(...args)
        injector.provide({ provide: new InjectionToken(target.name), useValue: this })
        injector.provide({ provide: COMPONENT, useValue: this })
        setCurrentInjector(parent)
      }
    }
  }
}
