import { Constructor } from '../types/constructor'
import { ROOT_INJECTOR } from '../utils/context'

export type InjectableLocation = 'root'

export interface InjectableProps {
  providedIn?: InjectableLocation
}

export function Injectable(props: InjectableProps = {}) {
  return function (target: Constructor) {
    if (props.providedIn === 'root') {
      ROOT_INJECTOR.provide(target)
    }

    return target
  }
}
