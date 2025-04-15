import { InjectionToken } from '../injection-token'
import { Constructor } from './constructor'

export type Provider<T = any> =
  | ConstructorProvider<T>
  | ValueProvider<T>
  | ClassProvider<T>
  | ExistingProvider<T>
  | FactoryProvider<T>

export type ConstructorProvider<T> = Constructor<T>

export type ValueProvider<T> = {
  provide: InjectionToken<T> | Constructor<T>
  useValue: T
}

export type ClassProvider<T> = {
  provide: InjectionToken<T> | Constructor<T>
  useClass: Constructor<T>
}

export type ExistingProvider<T> = {
  provide: InjectionToken<T> | Constructor<T>
  useExisting: InjectionToken<T> | Constructor<T>
}

export type FactoryProvider<T> = {
  provide: InjectionToken<T> | Constructor<T>
  useFactory: () => T
  deps?: Provider<unknown>[]
}
