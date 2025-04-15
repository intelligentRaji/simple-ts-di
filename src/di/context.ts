import { Injector } from './injector/injector'

export const ROOT_INJECTOR = new Injector()

let currentComponentInjector: Injector | null = null

export function setCurrentInjector(injector: Injector): void {
  //TODO: find a better way to do this
  if (injector === ROOT_INJECTOR) {
    currentComponentInjector = null
    return
  }

  currentComponentInjector = injector
}

export function getCurrentInjector(): Injector {
  return currentComponentInjector || ROOT_INJECTOR
}

export function assertRunInInjectionContext(func: Function): void {
  if (!currentComponentInjector) {
    throw new Error(`${func.name} must be called in injection context`)
  }
}
