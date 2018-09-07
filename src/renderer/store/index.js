import Vue from 'vue'
import Vuex from 'vuex'
import LowDb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import modules from './modules'
import path from 'path'
import { LAUNCHER_HOME } from '../utils'

Vue.use(Vuex)

const adapter = new FileSync(path.join(LAUNCHER_HOME, 'data.db'))
const db = LowDb(adapter);

Object.keys(modules).forEach(key => modules[key].beforeLoad && modules[key].beforeLoad(db));

const store = new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})

Object.keys(modules).forEach(key => modules[key].afterLoad && modules[key].afterLoad(store));

export {
  store,
  db
}
