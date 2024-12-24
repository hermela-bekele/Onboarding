'use client'
import React from 'react'
import { useState } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import OnboardingPortal from './components/OnboardingPortal'

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  const handleLogin = (username: string, password: string) => {
    setUsername(username)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
  }

  if (isLoggedIn) {
    return <OnboardingPortal username={username} onLogout={handleLogout} />
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      {isLogin ? (
        <Login 
          onLogin={handleLogin}
          onSignupClick={() => setIsLogin(false)}
        />
      ) : (
        <Signup 
          onSignup={(username) => handleLogin(username, '')}
          onLoginClick={() => setIsLogin(true)}
        />
      )}
      
    </main>
  )
}

