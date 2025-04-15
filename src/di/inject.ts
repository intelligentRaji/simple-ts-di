import { Constructor } from './types/constructor'
import { getCurrentInjector } from './context'
import { InjectionToken } from './injection-token'

export function inject<T>(target: InjectionToken<T> | Constructor<T>): T {
  const injector = getCurrentInjector()

  return injector.get(target)
}
