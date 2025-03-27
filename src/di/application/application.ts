import { Injector } from '../injector/injector'
import { Constructor } from '../types/constructor'
import { INJECTOR_STACK } from '../utils/inject'

export class Application {
  static readonly rootInjector = new Injector()

  static init<T extends Constructor>(root: T, providers: Constructor[]): InstanceType<T> {
    providers.forEach((provider) => Application.rootInjector.provide(provider))
    INJECTOR_STACK.push(Application.rootInjector)
    return new root({}) as InstanceType<T>
  }
}
