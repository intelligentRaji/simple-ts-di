import { Constructor } from '../types/constructor'
import { ROOT_INJECTOR } from '../context'
import { Provider } from '../types/provider'

export class Application {
  static init<T extends Constructor>(root: T, providers: Provider[] = []): InstanceType<T> {
    providers.forEach((provider) => ROOT_INJECTOR.provide(provider))
    return new root({})
  }
}
