import { Constructor } from '../types/constructor'
import { ROOT_INJECTOR } from '../context'
import { Provider } from '../types/provider'

export type InjectableLocation = 'root'
export interface InjectableProps {
  providedIn?: InjectableLocation
  useFactory?: () => any
  deps?: Provider[]
}

export function Injectable({ providedIn, useFactory, deps }: InjectableProps = {}) {
  return function (target: Constructor) {
    if (providedIn === 'root') {
      const provider: Provider = useFactory ? { provide: target, useFactory, deps } : target

      ROOT_INJECTOR.provide(provider)
      return
    }

    return target
  }
}
