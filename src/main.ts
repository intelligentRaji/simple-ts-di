import { Application } from './di/application/application'
import { AppComponent } from './test/components/app/app'

const root = document.getElementById('app')

const app = Application.init(AppComponent)
root?.append(app.node)
