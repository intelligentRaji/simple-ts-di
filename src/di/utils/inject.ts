import { Injector } from '../injector/injector'
import { Constructor } from '../types/constructor'

export const INJECTOR_STACK: Injector[] = []

export function inject<T extends Constructor>(target: T): InstanceType<T> {
  const injector = getCurrentInjector()

  if (!injector) {
    throw new Error('Injector is not initialized')
  }

  return injector.get(target)
}

export function getCurrentInjector(): Injector | null {
  return INJECTOR_STACK[INJECTOR_STACK.length - 1]
}
