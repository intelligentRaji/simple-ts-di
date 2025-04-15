import { InjectionToken } from '../injection-token'
import { Constructor } from './constructor'

export type Provider<T = any> =
  | ConstructorProvider<T>
  | ValueProvider<T>
  | ClassProvider<T>
  | ExistingProvider<T>
  | FactoryProvider<T>

export type ConstructorProvider<T> = Constructor<T>

export interface ValueProvider<T> {
  provide: InjectionToken<T> | Constructor<T>
  useValue: T
}

export interface ClassProvider<T> {
  provide: InjectionToken<T> | Constructor<T>
  useClass: Constructor<T>
}

export interface ExistingProvider<T> {
  provide: InjectionToken<T> | Constructor<T>
  useExisting: InjectionToken<T> | Constructor<T>
}

export interface FactoryProvider<T> extends FactoryOptions<T> {
  provide: InjectionToken<T> | Constructor<T>
}

export interface FactoryOptions<T = any> {
  useFactory: () => T
  deps?: Provider[]
}
