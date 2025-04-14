import { Constructor } from '../types/constructor'
import { ROOT_INJECTOR } from '../utils/context'

export class Application {
  static init<T extends Constructor>(root: T, providers: Constructor[] = []): InstanceType<T> {
    providers.forEach((provider) => ROOT_INJECTOR.provide(provider))
    return new root({})
  }
}
