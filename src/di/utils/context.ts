import { Injector } from '../injector/injector'

export const ROOT_INJECTOR = new Injector()

let currentComponentInjector: Injector | null = null

export function setCurrentInjector(injector: Injector | null): void {
  currentComponentInjector = injector
}

export function getCurrentInjector(): Injector | null {
  return currentComponentInjector || ROOT_INJECTOR
}

export function assertRunInInjectionContext(func: Function): void {
  if (!currentComponentInjector) {
    throw new Error(`${func.name} must be called in injection context`)
  }
}
