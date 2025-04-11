import { Constructor } from '../types/constructor'
import { getCurrentInjector } from './context'

export function inject<T extends Constructor>(target: T): InstanceType<T> {
  const injector = getCurrentInjector()

  if (!injector) {
    throw new Error('Injector is not initialized')
  }

  return injector.get(target)
}
