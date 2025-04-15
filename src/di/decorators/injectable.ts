import { Constructor } from '../types/constructor'
import { ROOT_INJECTOR } from '../context'
import { FactoryOptions, Provider } from '../types/provider'

export type InjectableLocation = 'root'

export interface InjectableFactoryProps<T> extends FactoryOptions<T> {
  providedIn: InjectableLocation
}

export interface InjectableClassProps {
  providedIn?: InjectableLocation
}

export type InjectableProps<T = any> = InjectableFactoryProps<T> | InjectableClassProps

export function Injectable(props: InjectableProps = {}) {
  return function (target: Constructor) {
    if (props.providedIn === 'root') {
      const provider: Provider = isFactoryProps(props)
        ? { provide: target, useFactory: props.useFactory, deps: props.deps }
        : target

      ROOT_INJECTOR.provide(provider)
      return
    }

    return target
  }
}

function isFactoryProps<T>(props: InjectableProps<T>): props is InjectableFactoryProps<T> {
  return 'useFactory' in props
}
