import React, { useContext, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Dashboard from './modules/Dashboard'
import Auth from './components/Auth'
import MainApplication from './MainApplication'
import { AuthContext } from './providers/AuthProvider'
import TodoList from './modules/TodoList'

function AppRouter(): React.JSX.Element {
  const { auth, authLoading } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authLoading) {
      if (!auth && location.pathname !== '/auth') {
        navigate('/auth')
      } else if (auth) {
        if (location.pathname === '/auth') {
          navigate('/')
        } else if (location.pathname === '/') {
          navigate('/dashboard')
        }
      }
    }
  }, [auth, location, authLoading])

  return (
    <Routes>
      <Route path="/" element={<MainApplication />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="todo-list" element={<TodoList />} />
      </Route>
      <Route path="/auth" element={<Auth />} />
    </Routes>
  )
}

export default AppRouter
