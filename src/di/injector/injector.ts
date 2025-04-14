import { Constructor } from '../types/constructor'

const NOT_INITIALIZED = 'NOT_INITIALIZED'

export class Injector {
  private readonly providers = new Map<any, any>()
  private readonly parent: Injector | null = null

  constructor(parent: Injector | null = null, providers: Constructor[] = []) {
    this.parent = parent
    providers.forEach((provider) => this.provide(provider))
    this.providers.set(Injector.name, this)
  }

  public get<T extends Constructor>(target: T): InstanceType<T> {
    if (!this.providers.has(target.name)) {
      if (this.parent) {
        return this.parent.get(target)
      }

      throw new Error(`Dependency ${target.name} is not registered`)
    }

    const dependency = this.providers.get(target.name)

    if (dependency === NOT_INITIALIZED) {
      this.providers.set(target.name, new target())
    }

    return this.providers.get(target.name)
  }

  /** @internal */
  public provide<T extends Constructor>(target: T, value?: InstanceType<T>): void {
    this.providers.set(target.name, value ?? NOT_INITIALIZED)
  }
}
