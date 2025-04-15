import { Injector } from './injector/injector'
import { Constructor } from './types/constructor'
import { assertRunInInjectionContext, setCurrentInjector } from './context'
import { inject } from './inject'

export function dynamicComponent<T extends Constructor>(
  component: T,
  params: ConstructorParameters<T>,
  injector?: Injector,
): InstanceType<T> {
  if (!injector) {
    assertRunInInjectionContext(dynamicComponent)
    injector = inject(Injector)
  }

  setCurrentInjector(injector)

  return new component(params)
}
