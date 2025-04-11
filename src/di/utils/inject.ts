import { Constructor } from '../types/constructor'
import { getCurrentInjector } from './context'

export function inject<T extends Constructor>(target: T): InstanceType<T> {
  const injector = getCurrentInjector()

  return injector.get(target)
}
