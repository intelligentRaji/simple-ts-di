import { getCurrentInjector, setCurrentInjector } from '../context'
import { InjectionToken } from '../injection-token'
import { Constructor } from '../types/constructor'
import { ClassProvider, FactoryProvider, Provider, ValueProvider } from '../types/provider'

type UninitializedProvider = {
  provider: Provider<any>
}

type InitializedProvider = {
  value: any
}

type ProviderData = UninitializedProvider | InitializedProvider

export class Injector {
  private readonly providers = new Map<string, ProviderData>()
  private readonly parent: Injector | null = null

  constructor(parent: Injector | null = null, providers: Provider<any>[] = []) {
    this.parent = parent
    providers.forEach((provider) => this.provide(provider))
    this.provide({ provide: Injector, useValue: this })
  }

  public get<T>(token: InjectionToken<T> | Constructor<T>): T {
    const dependency = this.providers.get(token.name)

    if (!dependency) {
      if (this.parent) {
        return this.parent.get(token)
      }

      throw new Error(`Dependency ${token.name} is not registered`)
    }

    if (isProviderInitialized(dependency)) {
      return dependency.value
    }

    const value = this.initializeProvider(dependency)
    this.providers.set(token.name, { value })
    return value
  }

  public provide<T>(providerOrConstructor: Provider<T>): void {
    if (isProviderConstructor(providerOrConstructor)) {
      providerOrConstructor = createClassProviderFromConstructor(providerOrConstructor)
    }

    this.providers.set(providerOrConstructor.provide.name, { provider: providerOrConstructor })
  }

  private initializeProvider(providerData: UninitializedProvider): any {
    const { provider } = providerData

    if ('useValue' in provider) {
      return resolveValueProvider(provider)
    }

    if ('useClass' in provider) {
      return resolveClassProvider(provider)
    }

    if ('useFactory' in provider) {
      return resolveFactoryProvider(provider)
    }

    if ('useExisting' in provider) {
      return this.get(provider.useExisting)
    }
  }
}

function createClassProviderFromConstructor<T>(target: Constructor<T>): ClassProvider<T> {
  return {
    provide: new InjectionToken(target.name),
    useClass: target,
  }
}

function isProviderConstructor<T>(target: Provider<T> | Constructor<T>): target is Constructor<T> {
  return typeof target === 'function'
}

function isProviderInitialized(provider: ProviderData): provider is InitializedProvider {
  return 'value' in provider
}

function resolveValueProvider<T>(provider: ValueProvider<T>): T {
  return provider.useValue
}

function resolveClassProvider<T>(provider: ClassProvider<T>): T {
  return new provider.useClass()
}

function resolveFactoryProvider<T>(provider: FactoryProvider<T>): T {
  const { useFactory, deps } = provider
  const parentInjector = getCurrentInjector()
  const injector = new Injector(parentInjector, deps)

  setCurrentInjector(injector)
  const value = useFactory()
  setCurrentInjector(parentInjector)

  return value
}
