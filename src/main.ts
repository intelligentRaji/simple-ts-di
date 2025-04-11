import { Application } from './di/application/application'
import { AppComponent } from './test/components/app/app'
import { StateService } from './test/services/state.service'

const root = document.getElementById('app')

const app = Application.init(AppComponent, [StateService])
root?.append(app.node)
