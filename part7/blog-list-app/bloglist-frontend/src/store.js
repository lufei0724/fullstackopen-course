import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './redux/notificationRedux'
import loginReducer from './redux/loginUserRedux'
import blogsReducer from './redux/blogsRedux'
import usersReducer from './redux/usersRedux'

const rootReducer = combineReducers({
  notification: notificationReducer,
  loginUser: loginReducer,
  blogs: blogsReducer,
  users: usersReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store