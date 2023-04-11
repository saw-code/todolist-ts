import { tasksReducer } from './tasksReducer'
import { todoListsReducer } from './todoListsReducer'
import { combineReducers, legacy_createStore} from 'redux'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todoListsReducer
})

// непосредственно создаём store
export const store = legacy_createStore(rootReducer)

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store

// Создание объекта store(13 строка), т.е. результат выполнения legacy_createStore(rootReducer).
// У него будет свойсво state у которого будет св-во tasks и св-во
// todolists. И у этого объекта появятся методы getState(), dispatch(), subscribe()
//
// {
//   state: {
//     tasks: {}
//     todolists: []
//   }
//   getState()
//   dispatch()
//   subscribe()
// }