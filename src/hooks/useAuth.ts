/* eslint-disable @typescript-eslint/member-delimiter-style */
import React, { useEffect, useState } from 'react'

function useAuth(): { auth: boolean; loading: boolean } {
  const [auth, setAuth] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({}) // TODO

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuth(true)
    }
    setLoading(false)
  }, [])

  return { auth, loading, userData }
}

export default useAuth
