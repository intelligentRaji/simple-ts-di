import { BaseComponent, Tags } from '../base-component/base-component'
import { RootInjector } from '../injector/root-injector'
import { Constructor } from '../types/component'
import { INJECTOR_STACK } from '../utils/inject'

export class Application {
  static readonly rootInjector = new RootInjector()

  static init<T extends typeof BaseComponent<Tags>>(
    root: T,
    providers: Constructor[],
  ): InstanceType<T> {
    providers.forEach((provider) => Application.rootInjector.provide(provider))
    INJECTOR_STACK.push(Application.rootInjector)
    return new root({}) as InstanceType<T>
  }
}
