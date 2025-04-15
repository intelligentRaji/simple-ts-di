import { Injectable } from '../../di/decorators/injectable'
import { inject } from '../../di/inject'
import { InjectionToken } from '../../di/injection-token'

export const FACTORY_DEPENDENCY = new InjectionToken('FACTORY_DEPENDENCY')

@Injectable({
  providedIn: 'root',
  useFactory: () => new ServiceCreatedWithFactory(),
  deps: [{ provide: FACTORY_DEPENDENCY, useValue: 'FACTORY_DEPENDENCY' }],
})
export class ServiceCreatedWithFactory {
  private readonly dependency = inject(FACTORY_DEPENDENCY)

  public logDependecy(): void {
    console.log(this.dependency)
  }
}
