import { InjectionToken } from '../../di/injection-token'

export const ROOT_TOKEN = new InjectionToken('ROOT_TOKEN', {
  providedIn: 'root',
  useFactory: () => 'ROOT_TOKEN',
  deps: [],
})
