import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './modules/Dashboard'
import useAuth from './hooks/useAuth'
import AuthLoading from './authentication/AuthLoading'
import Auth from './authentication/Auth'

function AppRouter(): React.ReactElement {
  const { auth, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth && !loading) {
      navigate('/auth')
    }
  }, [auth, loading])

  return (
    <Routes>
      <Route
        path="/"
        element={loading ? <AuthLoading /> : auth && <Dashboard />}
      />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  )
}

export default AppRouter
