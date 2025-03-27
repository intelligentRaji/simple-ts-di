import 'reflect-metadata'
import { Application } from './application/application'
import { Root } from './test/root'
import { Dependency } from './test/dependency'

Application.init(Root, [Dependency])
