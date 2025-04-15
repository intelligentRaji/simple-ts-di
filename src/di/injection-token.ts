import { ROOT_INJECTOR } from './context'
import { InjectableFactoryProps } from './decorators/injectable'

export class InjectionToken<T = unknown> {
  constructor(
    public readonly name: string,
    public readonly options?: InjectableFactoryProps<T>,
  ) {
    if (options?.providedIn === 'root') {
      ROOT_INJECTOR.provide({
        provide: this,
        useFactory: options.useFactory,
        deps: options.deps,
      })
    }
  }
}
